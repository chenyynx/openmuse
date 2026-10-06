import { ArrowRight, Bell, X } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useAgentWorkspace } from "./agent-workspace";
import { Button, Card, colors, ErrorNotice, resultSummary, s } from "./ui";
import { useWorkspace } from "./workspace";

export function BackgroundUpdates() {
  const { t } = useTranslation();
  const { data, mutate } = useAgentWorkspace();
  const { open } = useWorkspace();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const updates = data?.notifications.filter((item) => !item.read && item.taskId) || [];
  const update = updates[0];
  if (!update || data?.identity.showChatUpdates === false) return null;
  async function dismiss() {
    if (!update) return;
    setBusy(true);
    try {
      await mutate(`/notifications/${update.id}/read`, {});
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <Card style={{ backgroundColor: colors.sky, padding: 16, gap: 10 }}>
      <View style={[s.between, { gap: 12 }]}>
        <View style={[s.row, { gap: 7 }]}>
          <Bell size={14} color={colors.blueDark} />
          <Text style={s.small}>{t("backgroundUpdates.heading")}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("backgroundUpdates.dismiss")}
          disabled={busy}
          onPress={() => void dismiss()}
          hitSlop={10}
          style={{ padding: 6 }}
        >
          <X size={16} color={colors.muted} />
        </Pressable>
      </View>
      <Text style={s.heading}>{update.title}</Text>
      <Text style={s.text}>{resultSummary(update.body)}</Text>
      <View style={[s.row, { gap: 8, flexWrap: "wrap" }]}>
        <Button
          small
          icon={ArrowRight}
          onPress={() => update.taskId && open({ type: "task", taskId: update.taskId })}
        >
          {t("backgroundUpdates.viewTask")}
        </Button>
        {updates.length > 1 && (
          <Button small onPress={() => open({ type: "notifications" })}>
            {t("backgroundUpdates.moreUpdates", { count: updates.length - 1 })}
          </Button>
        )}
      </View>
      <ErrorNotice error={error} />
    </Card>
  );
}
