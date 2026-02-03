import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import ThemeProvider from "@/components/ThemeProvider";
import CookieConsent from "@/components/CookieConsent";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "맛있는 기록 - AI 레시피 노트 | 음성 기록 & 사진 분석",
  description: "음성으로 레시피를 기록하고, 사진으로 요리를 분석하세요. AI가 재료와 조리법을 자동으로 정리해드립니다. 나만의 레시피 컬렉션을 만들어보세요.",
  keywords: ["레시피", "요리", "AI", "음성인식", "사진분석", "요리앱", "레시피앱", "cooking", "recipe"],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
        {/* Google AdSense - beforeInteractive로 빠르게 로드 */}
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1907306190071217"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {/* AdSense 메타 태그 (추가 확인용) */}
        <meta name="google-adsense-account" content="ca-pub-1907306190071217" />
      </head>
      <body className="antialiased theme-transition">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <CookieConsent />
            <ServiceWorkerRegister />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
