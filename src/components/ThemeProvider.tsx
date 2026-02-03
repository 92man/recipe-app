'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useStore();

  useEffect(() => {
    // 초기 테마 설정
    const savedTheme = localStorage.getItem('recipe-storage');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        const storedTheme = parsed.state?.theme || 'light';
        document.documentElement.setAttribute('data-theme', storedTheme);
      } catch {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } else {
      // 시스템 테마 감지
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
}
