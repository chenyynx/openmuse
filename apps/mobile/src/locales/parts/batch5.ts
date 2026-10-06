export const en: Record<string, string> = {
  // api.ts — 网络层（仅渲染给用户的兜底错误）
  "api.requestFailed": "Request failed ({{status}})",
  "api.openFailed": "Could not open your workspace.",
  // App.tsx — 欢迎 / 接入工作区
  "app.welcome.title": "Welcome to OpenMuse.",
  "app.welcome.tagline": "A little room for your day.",
  "app.welcome.keyLabel": "Workspace access key",
  "app.welcome.keyPlaceholder": "Required for a live workspace",
  "app.welcome.openButton": "Open workspace",
  "app.welcome.localHint":
    "Local workspaces open without a key. Make sure your OpenMuse server is running at {{url}}.",
  // App.tsx — 载入中
  "app.loading.opening": "Opening your workspace…",
  "app.loading.retry": "Try again",
  // App.tsx — 底部导航
  "app.nav.chat": "Chat",
  "app.nav.activity": "Activity",
  "app.nav.ideas": "Ideas",
  "app.nav.goals": "Goals",
  "app.nav.apps": "Apps",
  // App.tsx — 各分区标题
  "app.title.activity": "Activity",
  "app.title.ideas": "Ideas",
  "app.title.goals": "Goals",
  "app.title.apps": "Apps",
  "app.title.connections": "Apps",
  "app.title.mail": "Mail",
  "app.title.calendar": "Calendar",
  "app.title.browser": "Browser",
  "app.title.files": "Files",
  // App.tsx — 各分区副标题
  "app.subtitle.activity": "Plans, progress, decisions and results.",
  "app.subtitle.ideas": "Useful next steps, grounded in your world.",
  "app.subtitle.goals": "Longer-term goals and things to keep an eye on.",
  "app.subtitle.apps": "Connections, capabilities and what your agent remembers.",
  "app.subtitle.connections": "Connections and capabilities.",
  "app.subtitle.mail": "The conversations behind your work.",
  "app.subtitle.calendar": "Time for what matters.",
  "app.subtitle.browser": "Your connected browsing sessions.",
  "app.subtitle.files": "Documents, forms and filled copies.",
  // App.tsx — 助手状态行
  "app.status.readyToReview": "Ready to review · {{title}}",
  "app.status.needsInput": "Needs your input · {{title}}",
  "app.status.pickingUp": "Picking up your next task…",
  "app.status.idle": "Here when you need me",
  // App.tsx — 无障碍标签
  "app.a11y.openMenu": "Open conversations and menu",
  "app.a11y.openAgentActivity": "Open {{agent}} activity and approvals",
  "app.a11y.notifications": "Notifications, {{count}} unread or pending",
  "app.a11y.dismissNotification": "Dismiss notification",
  // App.tsx — 导航与操作
  "app.backToApps": "Back to Apps",
  "app.retryMainChat": "Retry main chat",
  "app.sideChat": "Side chat",
  // date-time.ts — 校验提示（en 需保留 "does not exist"，date-time.test.ts 断言依赖）
  "dateTime.incompleteDateTime": "Enter a complete date and time.",
  "dateTime.invalidDateTime": "Choose a valid date and time.",
  "dateTime.nonexistentTime":
    "This time does not exist in the selected time zone. Choose another time.",
  // background-updates.tsx — 后台更新卡片
  "backgroundUpdates.heading": "An update for you",
  "backgroundUpdates.dismiss": "Dismiss background update",
  "backgroundUpdates.viewTask": "View task",
  "backgroundUpdates.moreUpdates": "{{count}} more updates",
  // PdfReader.web.tsx / PdfReader.native.tsx — 共用
  "pdfReader.previous": "Previous",
  "pdfReader.next": "Next",
  "pdfReader.zoomOut": "Zoom out",
  "pdfReader.zoomIn": "Zoom in",
  "pdfReader.frameTitle": "PDF document reader",
  "pdfReader.downloadHint": "Use the reader toolbar to download or print a copy.",
  // BrowserConsole.web.tsx（native 版无可翻译文案）
  "browserConsole.frameTitle": "Remote browser session console",
};

export const zh: Record<string, string> = {
  // api.ts — 网络层（仅渲染给用户的兜底错误）
  "api.requestFailed": "请求失败（{{status}}）",
  "api.openFailed": "无法打开你的工作区。",
  // App.tsx — 欢迎 / 接入工作区
  "app.welcome.title": "欢迎使用 OpenMuse。",
  "app.welcome.tagline": "为你的一天留一点空间。",
  "app.welcome.keyLabel": "工作区访问密钥",
  "app.welcome.keyPlaceholder": "实时工作区需填写",
  "app.welcome.openButton": "打开工作区",
  "app.welcome.localHint":
    "本地工作区无需密钥即可打开。请确认你的 OpenMuse 服务器正在 {{url}} 运行。",
  // App.tsx — 载入中
  "app.loading.opening": "正在打开你的工作区…",
  "app.loading.retry": "重试",
  // App.tsx — 底部导航
  "app.nav.chat": "对话",
  "app.nav.activity": "动态",
  "app.nav.ideas": "想法",
  "app.nav.goals": "目标",
  "app.nav.apps": "应用",
  // App.tsx — 各分区标题
  "app.title.activity": "动态",
  "app.title.ideas": "想法",
  "app.title.goals": "目标",
  "app.title.apps": "应用",
  "app.title.connections": "应用",
  "app.title.mail": "邮件",
  "app.title.calendar": "日历",
  "app.title.browser": "浏览器",
  "app.title.files": "文件",
  // App.tsx — 各分区副标题
  "app.subtitle.activity": "计划、进展、决策与结果。",
  "app.subtitle.ideas": "结合你的实际情况，给出可执行的下一步。",
  "app.subtitle.goals": "长期目标，以及需要留意的事。",
  "app.subtitle.apps": "连接、能力，以及你的智能体记住的内容。",
  "app.subtitle.connections": "连接与能力。",
  "app.subtitle.mail": "工作背后的那些对话。",
  "app.subtitle.calendar": "把时间留给重要的事。",
  "app.subtitle.browser": "你已连接的浏览会话。",
  "app.subtitle.files": "文档、表单和已填好的副本。",
  // App.tsx — 助手状态行
  "app.status.readyToReview": "待你审阅 · {{title}}",
  "app.status.needsInput": "需要你补充信息 · {{title}}",
  "app.status.pickingUp": "正在接手你的下一个任务…",
  "app.status.idle": "随时待命，需要时我都在",
  // App.tsx — 无障碍标签
  "app.a11y.openMenu": "打开对话与菜单",
  "app.a11y.openAgentActivity": "打开 {{agent}} 的动态与审批",
  "app.a11y.notifications": "通知，{{count}} 条未读或待处理",
  "app.a11y.dismissNotification": "关闭通知",
  // App.tsx — 导航与操作
  "app.backToApps": "返回应用",
  "app.retryMainChat": "重试主对话",
  "app.sideChat": "侧边对话",
  // date-time.ts — 校验提示
  "dateTime.incompleteDateTime": "请填写完整的日期和时间。",
  "dateTime.invalidDateTime": "请选择有效的日期和时间。",
  "dateTime.nonexistentTime": "所选时区中不存在这个时间，请另选一个时间。",
  // background-updates.tsx — 后台更新卡片
  "backgroundUpdates.heading": "有一条新动态",
  "backgroundUpdates.dismiss": "关闭后台更新",
  "backgroundUpdates.viewTask": "查看任务",
  "backgroundUpdates.moreUpdates": "还有 {{count}} 条更新",
  // PdfReader.web.tsx / PdfReader.native.tsx — 共用
  "pdfReader.previous": "上一页",
  "pdfReader.next": "下一页",
  "pdfReader.zoomOut": "缩小",
  "pdfReader.zoomIn": "放大",
  "pdfReader.frameTitle": "PDF 文档阅读器",
  "pdfReader.downloadHint": "使用阅读器工具栏下载或打印副本。",
  // BrowserConsole.web.tsx（native 版无可翻译文案）
  "browserConsole.frameTitle": "远程浏览器会话控制台",
};
