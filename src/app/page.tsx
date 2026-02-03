'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/components/AuthProvider';
import VoiceRecorder from '@/components/VoiceRecorder';
import ImageAnalyzer from '@/components/ImageAnalyzer';
import RecipeList from '@/components/RecipeList';
import RecipeSearch from '@/components/RecipeSearch';
import TabNavigation from '@/components/TabNavigation';
import AuthForm from '@/components/AuthForm';
import Footer from '@/components/Footer';

export default function Home() {
  const { activeTab } = useStore();
  const { user, loading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-50 grain">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <span className="text-6xl block animate-float">🍳</span>
            <div className="absolute inset-0 bg-accent-400/20 blur-2xl rounded-full" />
          </div>
          <p className="text-warm-500 mt-6 text-sm tracking-wide">잠시만 기다려주세요...</p>
        </div>
      </div>
    );
  }

  // 로그인 모달
  if (showAuthModal && !user) {
    return (
      <div className="relative grain">
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-warm-100 text-warm-500 hover:bg-warm-200 hover:text-warm-700 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <AuthForm />
      </div>
    );
  }

  const tabDescriptions: Record<string, { title: string; subtitle: string }> = {
    voice: { title: '음성 레시피', subtitle: '요리하며 음성으로 기록하세요' },
    image: { title: 'AI 분석', subtitle: '사진으로 레시피를 분석해요' },
    search: { title: '레시피 검색', subtitle: '요리 이름으로 검색하세요' },
    list: { title: '내 레시피', subtitle: '저장된 레시피를 확인하세요' },
  };

  return (
    <main className="min-h-screen max-w-md mx-auto relative grain">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 pt-safe">
        <div className="glass border-b border-warm-200/50">
          <div className="px-5 pt-5 pb-4">
            {/* 상단 로고 & 로그인 */}
            <div className="flex items-center justify-between mb-5 opacity-0 animate-fade-in-up">
              <Link href="/" className="flex items-center gap-3 group">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">🍳</span>
                <h1 className="font-handwriting text-2xl text-warm-800 tracking-tight">
                  맛있는 기록
                </h1>
              </Link>

              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-warm-600 font-medium truncate max-w-[80px]">
                    {user.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={signOut}
                    className="text-xs text-warm-400 hover:text-accent-600 px-2.5 py-1.5 rounded-lg hover:bg-warm-100 transition-all"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="text-sm font-medium text-white bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2.5 rounded-xl shadow-md shadow-accent-200 hover:shadow-lg hover:shadow-accent-300 transition-all"
                >
                  로그인
                </button>
              )}
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="flex gap-2 opacity-0 animate-fade-in-up delay-1">
              <Link
                href="/recipes"
                className="flex-1 text-center py-2.5 px-3 bg-white/80 hover:bg-white text-warm-600 hover:text-accent-600 text-sm font-medium rounded-xl border border-warm-200/60 hover:border-accent-300 shadow-sm hover:shadow-md transition-all"
              >
                인기 레시피
              </Link>
              <Link
                href="/guide"
                className="flex-1 text-center py-2.5 px-3 bg-white/80 hover:bg-white text-warm-600 hover:text-accent-600 text-sm font-medium rounded-xl border border-warm-200/60 hover:border-accent-300 shadow-sm hover:shadow-md transition-all"
              >
                요리 가이드
              </Link>
              <Link
                href="/tips"
                className="flex-1 text-center py-2.5 px-3 bg-white/80 hover:bg-white text-warm-600 hover:text-accent-600 text-sm font-medium rounded-xl border border-warm-200/60 hover:border-accent-300 shadow-sm hover:shadow-md transition-all"
              >
                요리 팁
              </Link>
            </nav>
          </div>

          {/* 현재 탭 설명 */}
          <div className="px-5 pb-4 opacity-0 animate-fade-in-up delay-2">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-accent-400 to-accent-600" />
              <div>
                <h2 className="text-base font-semibold text-warm-800">
                  {tabDescriptions[activeTab]?.title}
                </h2>
                <p className="text-xs text-warm-500">
                  {tabDescriptions[activeTab]?.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 탭 콘텐츠 */}
      <div className="relative opacity-0 animate-fade-in-up delay-3">
        {!user && (activeTab === 'voice' || activeTab === 'image' || activeTab === 'list') ? (
          <div className="p-6">
            <div className="recipe-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-warm-800 mb-2">
                로그인이 필요해요
              </h2>
              <p className="text-sm text-warm-500 mb-6 leading-relaxed">
                {activeTab === 'voice' && '음성으로 레시피를 기록하려면\n로그인해주세요.'}
                {activeTab === 'image' && 'AI 레시피 분석 기능을\n사용하려면 로그인해주세요.'}
                {activeTab === 'list' && '저장된 레시피를 확인하려면\n로그인해주세요.'}
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn-primary"
              >
                <span className="relative z-10">로그인하기</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'voice' && <VoiceRecorder />}
            {activeTab === 'image' && <ImageAnalyzer />}
            {activeTab === 'search' && <RecipeSearch />}
            {activeTab === 'list' && <RecipeList />}
          </>
        )}
      </div>

      {/* 푸터 */}
      <Footer />

      {/* 하단 네비게이션 */}
      <TabNavigation />
    </main>
  );
}
