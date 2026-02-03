'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // 페이지 로드 후 1초 뒤에 배너 표시
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      essential: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString(),
    }));
    setShowBanner(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      essential: true,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString(),
    }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 p-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-warm-200 overflow-hidden">
        <div className="p-5">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">🍪</span>
            <div>
              <h3 className="font-bold text-warm-800 mb-1">쿠키 사용 안내</h3>
              <p className="text-sm text-warm-600 leading-relaxed">
                맛있는 기록은 더 나은 서비스 제공을 위해 쿠키를 사용합니다.
                쿠키를 통해 사용자 경험을 개선하고, 맞춤 콘텐츠를 제공합니다.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={acceptAll}
              className="flex-1 bg-orange-500 text-white py-2.5 px-4 rounded-xl font-medium hover:bg-orange-600 transition-colors text-sm"
            >
              모두 허용
            </button>
            <button
              onClick={acceptEssential}
              className="flex-1 bg-warm-100 text-warm-700 py-2.5 px-4 rounded-xl font-medium hover:bg-warm-200 transition-colors text-sm"
            >
              필수만 허용
            </button>
          </div>

          <p className="mt-3 text-xs text-warm-500 text-center">
            자세한 내용은{' '}
            <Link href="/privacy" className="text-orange-600 hover:underline">
              개인정보처리방침
            </Link>
            을 확인해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
