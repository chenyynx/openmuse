import { createHash } from "node:crypto";
import "./config.ts";
import { HttpAgent } from "@ag-ui/client";
import {
  type AgentsFactory,
  type CopilotKitIntelligence,
  CopilotRuntime,
  createCopilotHonoHandler,
} from "@copilotkit/runtime/v2";
import type { Auth } from "./auth.ts";
import type { Config } from "./config.ts";
import { ConversationAgent } from "./engine/conversation.ts";
import type { AgentService } from "./engine/service.ts";
import { createJevAdapter, type JevAdapter } from "./jev/adapter.ts";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * CopilotKit Intelligence requires RFC 4122 user and thread IDs, so hash the local values. The
 * version and variant nibbles must be pinned (`4` and `8`) or the platform rejects the ID.
 */
export function stableUuid(value: string) {
  const hex = createHash("sha256").update(value).digest("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-8${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

/** Pin a client thread id to the platform UUID without renaming threads that are already UUIDs. */
export function threadUuid(owner: string, threadId: string) {
  return UUID_PATTERN.test(threadId) ? threadId : stableUuid(`${owner}:${threadId}`);
}

/**
 * The app sends human-readable thread ids (`local-main`, ...) but the Intelligence platform
 * rejects anything that is not a UUID. Rewrite the id everywhere it appears in the request so
 * every request that names the same thread lands on the same platform thread.
 */
export async function normalizeIntelligenceRequest(request: Request, owner: string) {
  const url = new URL(request.url);
  const basePath = "/api/copilotkit";
  const hasBasePath = url.pathname.startsWith(basePath);
  const relativePath = hasBasePath ? url.pathname.slice(basePath.length) : url.pathname;
  const parts = relativePath.split("/");
  let mutatedPath = false;
  const isThreadId = (index: number) =>
    (parts[1] === "threads" && index === 2) || (parts[3] === "stop" && index === 4);
  url.pathname = `${hasBasePath ? basePath : ""}${parts
    .map((part, index) => {
      if (!isThreadId(index) || !part || UUID_PATTERN.test(part)) return part;
      mutatedPath = true;
      return threadUuid(owner, decodeURIComponent(part));
    })
    .join("/")}`;

  let body: string | ArrayBuffer | undefined;
  let bodyRead = false;
  let mutatedBody = false;
  const contentType = request.headers.get("content-type") ?? "";
  if (request.body !== null && (contentType.includes("application/json") || mutatedPath)) {
    bodyRead = true;
    if (contentType.includes("application/json")) {
      body = await request.text();
      try {
        const parsed: unknown = JSON.parse(body);
        if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
          const record = parsed as { threadId?: unknown };
          if (typeof record.threadId === "string" && record.threadId) {
            record.threadId = threadUuid(owner, record.threadId);
            body = JSON.stringify(record);
            mutatedBody = true;
          }
        }
      } catch {
        // Keep malformed input intact so the runtime can return its normal validation error.
      }
    } else {
      body = await request.arrayBuffer();
    }
  }

  if (!mutatedPath && !mutatedBody && !bodyRead) return request;
  const headers = new Headers(request.headers);
  if (body !== undefined && request.method !== "GET" && request.method !== "HEAD") {
    const byteLength =
      typeof body === "string" ? new TextEncoder().encode(body).byteLength : body.byteLength;
    headers.set("content-length", String(byteLength));
  }
  return new Request(url, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : body,
  });
}
export function agentConfigured(config: Config) {
  return (
    config.agentBackend === "sample" ||
    (config.agentBackend === "agui"
      ? Boolean(config.agentUrl)
      : Boolean(
          config.model &&
            (process.env.OPENAI_API_KEY ||
              process.env.ANTHROPIC_API_KEY ||
              process.env.GOOGLE_API_KEY),
        ))
  );
}
export function makeRuntime(
  config: Config,
  service: AgentService,
  auth: Auth,
  intelligence: CopilotKitIntelligence,
) {
  // Built on first use, then shared so live mode reuses one TypeSafe client across requests.
  let jevAdapter: JevAdapter | undefined;
  const sharedJevAdapter = () => (jevAdapter ??= createJevAdapter(config));
  const agents: AgentsFactory = async ({ request }) => ({
    default:
      config.agentBackend === "sample"
        ? new ConversationAgent(
            config,
            service,
            await auth.owner(request.headers.get("authorization") ?? undefined),
            sharedJevAdapter(),
          )
        : config.agentBackend === "agui"
          ? new HttpAgent({
              url: config.agentUrl ?? "http://127.0.0.1:1/unconfigured",
              headers: config.agentToken ? { Authorization: `Bearer ${config.agentToken}` } : {},
            })
          : new ConversationAgent(
              config,
              service,
              await auth.owner(request.headers.get("authorization") ?? undefined),
              sharedJevAdapter(),
            ),
  });
  const runtime = new CopilotRuntime({
    agents,
    intelligence,
    identifyUser: async (request) => ({
      id: stableUuid(await auth.owner(request.headers.get("authorization") ?? undefined)),
      name: "OpenMuse user",
    }),
    generateThreadNames: false,
  });
  return createCopilotHonoHandler({ runtime, basePath: "/api/copilotkit" });
}
