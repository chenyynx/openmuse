import { useTranslation } from "react-i18next";

export default function BrowserConsole({
  url,
  title,
  sandboxed = false,
}: {
  url: string;
  title?: string;
  sandboxed?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <iframe
      title={title ?? t("browserConsole.frameTitle")}
      src={url}
      sandbox={sandboxed ? "allow-scripts allow-same-origin allow-pointer-lock" : undefined}
      referrerPolicy={sandboxed ? "no-referrer" : undefined}
      style={{ height: 540, width: "100%", border: 0, borderRadius: 12, background: "#FFF" }}
    />
  );
}
