import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "帕不怕 ParkinFearless｜AI 主动预判型智能防抖辅具",
  description: "以多模态感知、AI-EMG 主动预判与三轴精准补偿，帮助帕金森患者更从容地完成进食与日常生活动作。",
  icons: {
    icon: "/brand-mark.jpeg",
    shortcut: "/brand-mark.jpeg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
