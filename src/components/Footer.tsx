'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-warm-100 border-t border-warm-200 py-6 px-4 mb-20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">🍳</span>
          <span className="font-handwriting text-lg text-warm-700">맛있는 기록</span>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-sm text-warm-600 mb-3">
          <Link href="/recipes" className="hover:text-orange-600 transition-colors">
            인기 레시피
          </Link>
          <span className="text-warm-300">|</span>
          <Link href="/guide" className="hover:text-orange-600 transition-colors">
            요리 가이드
          </Link>
          <span className="text-warm-300">|</span>
          <Link href="/tips" className="hover:text-orange-600 transition-colors">
            요리 팁
          </Link>
        </div>
        <div className="flex justify-center gap-4 text-xs text-warm-500 mb-4">
          <Link href="/about" className="hover:text-orange-600 transition-colors">
            서비스 소개
          </Link>
          <span className="text-warm-300">|</span>
          <Link href="/privacy" className="hover:text-orange-600 transition-colors">
            개인정보처리방침
          </Link>
          <span className="text-warm-300">|</span>
          <Link href="/terms" className="hover:text-orange-600 transition-colors">
            이용약관
          </Link>
        </div>

        <p className="text-center text-xs text-warm-500">
          © 2024 맛있는 기록. All rights reserved.
        </p>
        <p className="text-center text-xs text-warm-400 mt-1">
          문의: support@recipe-app.com
        </p>
      </div>
    </footer>
  );
}
