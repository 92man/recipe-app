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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-50 to-orange-50">
        <div className="text-center">
          <span className="text-5xl animate-bounce inline-block">🍳</span>
          <p className="text-warm-500 mt-4">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 로그인 모달
  if (showAuthModal && !user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute top-4 right-4 z-50 text-warm-500 hover:text-warm-700 text-2xl"
        >
          ✕
        </button>
        <AuthForm />
      </div>
    );
  }

  return (
    <main className="min-h-screen max-w-md mx-auto relative">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-gradient-to-b from-warm-50 via-warm-50 to-transparent pt-safe">
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <h1 className="font-handwriting text-2xl text-warm-800 flex items-center gap-2">
              <span className="text-3xl">🍳</span>
              맛있는 기록
            </h1>
            {user ? (
              <div className="text-right">
                <p className="text-xs text-warm-500 truncate max-w-[120px]">{user.email}</p>
                <button
                  onClick={signOut}
                  className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-sm bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                로그인
              </button>
            )}
          </div>
          {/* 상단 메뉴 */}
          <nav className="flex justify-center gap-1 mt-3 bg-warm-100 rounded-xl p-1">
            <Link
              href="/recipes"
              className="flex-1 text-center py-2 px-3 text-sm font-medium text-warm-700 hover:bg-white hover:text-orange-600 rounded-lg transition-all"
            >
              인기 레시피
            </Link>
            <Link
              href="/guide"
              className="flex-1 text-center py-2 px-3 text-sm font-medium text-warm-700 hover:bg-white hover:text-orange-600 rounded-lg transition-all"
            >
              요리 가이드
            </Link>
            <Link
              href="/tips"
              className="flex-1 text-center py-2 px-3 text-sm font-medium text-warm-700 hover:bg-white hover:text-orange-600 rounded-lg transition-all"
            >
              요리 팁
            </Link>
          </nav>
          <p className="text-sm text-warm-500 mt-3 text-center">
            {activeTab === 'voice' && '음성으로 레시피를 기록하세요'}
            {activeTab === 'image' && '사진으로 레시피를 분석하세요'}
            {activeTab === 'search' && '요리 이름으로 레시피를 검색하세요'}
            {activeTab === 'list' && '저장된 레시피를 확인하세요'}
          </p>
        </div>
        <div className="h-4 bg-gradient-to-b from-warm-50/80 to-transparent" />
      </header>

      {/* 탭 콘텐츠 */}
      <div className="relative">
        {!user && (activeTab === 'voice' || activeTab === 'image' || activeTab === 'list') ? (
          <div className="p-6 text-center">
            <div className="bg-white rounded-2xl shadow-soft p-8 max-w-sm mx-auto">
              <span className="text-5xl block mb-4">🔐</span>
              <h2 className="text-xl font-semibold text-warm-800 mb-2">로그인이 필요합니다</h2>
              <p className="text-warm-600 mb-6">
                {activeTab === 'voice' && '음성 레시피 기록 기능을 사용하려면 로그인해주세요.'}
                {activeTab === 'image' && 'AI 레시피 분석 기능을 사용하려면 로그인해주세요.'}
                {activeTab === 'list' && '내 레시피를 확인하려면 로그인해주세요.'}
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors"
              >
                로그인하기
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
