import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://marble414.github.io/parkinfearless-ai-care/"),
  title: "帕不怕 ParkinFearless｜多场景智能生活辅助系统",
  description: "以智能感知手柄为核心，融合多模态生物传感、边缘人工智能与模块化执行平台，面向帕金森患者的日常生活辅助系统。",
  icons: {
    icon: "https://marble414.github.io/parkinfearless-ai-care/brand-mark.jpeg",
    shortcut: "https://marble414.github.io/parkinfearless-ai-care/brand-mark.jpeg",
  },
  openGraph: {
    title: "帕不怕｜在震颤之前，把生活稳稳接住。",
    description: "多模态感知 × AI 主动预判 × 模块化生活辅助",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "https://marble414.github.io/parkinfearless-ai-care/og.jpg", width: 1200, height: 675, alt: "帕不怕多场景智能生活辅助系统" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "帕不怕｜在震颤之前，把生活稳稳接住。",
    description: "多模态感知 × AI 主动预判 × 模块化生活辅助",
    images: ["https://marble414.github.io/parkinfearless-ai-care/og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
