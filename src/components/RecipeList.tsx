'use client';

import { useState, useEffect } from 'react';
import { Recipe } from '@/types';
import Image from 'next/image';
import { getRecipes, deleteRecipe as deleteRecipeFromDB } from '@/lib/supabase/recipes';

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Supabase에서 레시피 불러오기
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const getSourceIcon = (source: Recipe['source']) => {
    switch (source) {
      case 'voice':
        return '🎙️';
      case 'image':
        return '📷';
      default:
        return '✏️';
    }
  };

  const getSourceLabel = (source: Recipe['source']) => {
    switch (source) {
      case 'voice':
        return '음성';
      case 'image':
        return '사진';
      default:
        return '직접';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };

  const handleDelete = async (id: string) => {
    // Supabase에서 삭제
    const success = await deleteRecipeFromDB(id);
    if (success) {
      setRecipes(prev => prev.filter(r => r.id !== id));
      setShowDeleteConfirm(null);
      if (selectedRecipe?.id === id) {
        setSelectedRecipe(null);
      }
    }
  };

  // 삭제 확인 모달 컴포넌트
  const DeleteConfirmModal = () => {
    if (!showDeleteConfirm) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="rounded-2xl p-6 max-w-sm w-full" style={{ background: 'var(--bg-elevated)', boxShadow: 'var(--shadow-xl)' }}>
          <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>레시피 삭제</h3>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>이 레시피를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteConfirm(null)}
              className="flex-1 py-3 rounded-xl transition-colors border"
              style={{ borderColor: 'var(--border-medium)', color: 'var(--text-secondary)' }}
            >
              취소
            </button>
            <button
              onClick={() => handleDelete(showDeleteConfirm)}
              className="flex-1 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (selectedRecipe) {
    return (
      <>
        <div className="p-4 pb-24">
          {/* 뒤로가기 */}
          <button
            onClick={() => setSelectedRecipe(null)}
            className="mb-4 flex items-center gap-2 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로
          </button>

          {/* 레시피 상세 */}
          <div className="recipe-card p-6 mb-4">
            {selectedRecipe.imageUrl && (
              <div className="mb-4 -mx-6 -mt-6">
                <Image
                  src={selectedRecipe.imageUrl}
                  alt={selectedRecipe.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
              </div>
            )}

            <div className="flex items-start justify-between mb-2">
              <h1 className="font-handwriting text-3xl" style={{ color: 'var(--text-primary)' }}>{selectedRecipe.title}</h1>
              <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                {getSourceIcon(selectedRecipe.source)}
                {getSourceLabel(selectedRecipe.source)}
              </span>
            </div>

            {selectedRecipe.description && (
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{selectedRecipe.description}</p>
            )}

            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {formatDate(selectedRecipe.createdAt)} 저장됨
            </p>
          </div>

          {/* 재료 */}
          <div className="recipe-card p-5 mb-4">
            <h2 className="font-handwriting text-xl mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>🥬</span> 재료
              <span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>
                ({selectedRecipe.ingredients.length}가지)
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{ingredient.name}</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {ingredient.amount} {ingredient.unit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 조리 단계 */}
          <div className="recipe-card p-5 mb-4">
            <h2 className="font-handwriting text-xl mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>👨‍🍳</span> 조리 순서
            </h2>
            <div className="space-y-4">
              {selectedRecipe.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                    style={{ background: 'var(--gradient-accent)' }}
                  >
                    {step.order}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.instruction}</p>
                    {step.duration && (
                      <p className="mt-2 text-sm flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <span>⏱️</span> {step.duration}
                      </p>
                    )}
                    {step.tip && (
                      <p
                        className="mt-1 text-sm px-3 py-2 rounded-lg flex items-start gap-1"
                        style={{ color: 'var(--accent-600)', background: 'var(--accent-50)' }}
                      >
                        <span>💡</span> {step.tip}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 원본 텍스트 (음성인 경우) */}
          {selectedRecipe.originalTranscript && (
            <div className="recipe-card p-5" style={{ background: 'var(--bg-secondary)' }}>
              <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>원본 음성 기록</h3>
              <p className="text-sm italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                &quot;{selectedRecipe.originalTranscript}&quot;
              </p>
            </div>
          )}

          {/* 삭제 버튼 */}
          <button
            onClick={() => setShowDeleteConfirm(selectedRecipe.id)}
            className="w-full mt-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 border"
            style={{ borderColor: 'var(--error-border)', color: 'var(--error-text)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            레시피 삭제
          </button>
        </div>
        <DeleteConfirmModal />
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 pb-24 flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <svg className="w-8 h-8 animate-spin mx-auto mb-3" style={{ color: 'var(--accent-500)' }} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p style={{ color: 'var(--text-muted)' }}>레시피 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pb-24">
      {recipes.length === 0 ? (
        <div className="recipe-card p-8 text-center">
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <span className="text-4xl">📝</span>
          </div>
          <h3 className="font-handwriting text-xl mb-2" style={{ color: 'var(--text-secondary)' }}>
            아직 저장된 레시피가 없어요
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            음성 녹음이나 사진 분석으로<br />첫 번째 레시피를 만들어보세요!
          </p>
        </div>
      ) : (
        <>
          <h2 className="font-handwriting text-2xl mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span>📚</span> 나의 레시피
            <span className="text-base font-normal" style={{ color: 'var(--text-muted)' }}>
              ({recipes.length}개)
            </span>
          </h2>

          <div className="space-y-3">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="recipe-card p-4 cursor-pointer hover:shadow-xl transition-all duration-300 flex gap-4"
              >
                {recipe.imageUrl ? (
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--bg-secondary)' }}
                  >
                    <span className="text-3xl">{getSourceIcon(recipe.source)}</span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-handwriting text-lg truncate" style={{ color: 'var(--text-primary)' }}>
                    {recipe.title}
                  </h3>
                  {recipe.description && (
                    <p className="text-sm truncate mt-1" style={{ color: 'var(--text-muted)' }}>
                      {recipe.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1">
                      🥬 {recipe.ingredients.length}가지
                    </span>
                    <span className="flex items-center gap-1">
                      📝 {recipe.steps.length}단계
                    </span>
                    <span>{formatDate(recipe.createdAt)}</span>
                  </div>
                </div>

                <svg className="w-5 h-5 flex-shrink-0 self-center" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </>
      )}

      <DeleteConfirmModal />
    </div>
  );
}
