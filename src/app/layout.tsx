import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "맛있는 기록 - AI 레시피 노트 | 음성 기록 & 사진 분석",
  description: "음성으로 레시피를 기록하고, 사진으로 요리를 분석하세요. AI가 재료와 조리법을 자동으로 정리해드립니다. 나만의 레시피 컬렉션을 만들어보세요.",
  keywords: ["레시피", "요리", "AI", "음성인식", "사진분석", "요리앱", "레시피앱", "cooking", "recipe"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "맛있는 기록",
  },
  openGraph: {
    title: "맛있는 기록 - AI 레시피 노트",
    description: "음성으로 레시피를 기록하고, 사진으로 요리를 분석하세요.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "맛있는 기록 - AI 레시피 노트",
    description: "음성으로 레시피를 기록하고, 사진으로 요리를 분석하세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfbf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0d0b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="antialiased theme-transition">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
