'use client';

import { useState } from 'react';
import { AnalysisResult, Recipe } from '@/types';
import RecipeEditor from './RecipeEditor';
import { addRecipe as addRecipeToDB } from '@/lib/supabase/recipes';

interface SearchResult extends AnalysisResult {
  servings?: string;
  totalTime?: string;
  difficulty?: string;
}

export default function RecipeSearch() {
  const [dishName, setDishName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = async () => {
    if (!dishName.trim()) {
      setError('요리 이름을 입력해주세요.');
      return;
    }

    setIsSearching(true);
    setError(null);
    setResult(null);
    setSaved(false);

    try {
      const response = await fetch('/api/search-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishName: dishName.trim() }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('로그인 후 이용할 수 있습니다.');
        }
        const data = await response.json();
        throw new Error(data.error || '검색에 실패했습니다.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '검색 중 오류가 발생했습니다.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;

    const saved = await addRecipeToDB({
      title: result.title,
      description: result.description,
      ingredients: result.ingredients,
      steps: result.steps,
      source: 'manual',
    });

    if (saved) {
      setSaved(true);
    }
  };

  const handleEditSave = async (recipe: Recipe) => {
    const saved = await addRecipeToDB({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      source: recipe.source,
    });

    if (saved) {
      setSaved(true);
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSearching) {
      handleSearch();
    }
  };

  return (
    <div className="px-4 pb-32">
      {/* 검색 입력 */}
      <div className="recipe-card p-4 mb-4">
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          요리 이름을 입력하세요
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="예: 김치찌개, 파스타, 된장찌개..."
            className="input-field flex-1"
            disabled={isSearching}
          />
          <button
            onClick={handleSearch}
            disabled={isSearching || !dishName.trim()}
            className="btn-primary px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {isSearching ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--error-bg)', border: '1px solid var(--error-border)' }}>
          <p className="text-sm" style={{ color: 'var(--error-text)' }}>{error}</p>
        </div>
      )}

      {/* 로딩 상태 */}
      {isSearching && (
        <div className="recipe-card p-8 text-center">
          <div className="inline-block animate-bounce text-4xl mb-3">🍳</div>
          <p style={{ color: 'var(--text-secondary)' }}>레시피를 찾고 있어요...</p>
        </div>
      )}

      {/* 편집 모드 */}
      {result && isEditing && (
        <div className="recipe-card p-4">
          <RecipeEditor
            initialData={result}
            originalContext={`레시피 검색: ${dishName}`}
            onSave={handleEditSave}
            onCancel={handleEditCancel}
          />
        </div>
      )}

      {/* 검색 결과 */}
      {result && !isSearching && !isEditing && (
        <div className="recipe-card overflow-hidden">
          {/* 헤더 */}
          <div className="p-4 text-white" style={{ background: 'var(--gradient-accent)' }}>
            <h2 className="text-xl font-bold">{result.title}</h2>
            {result.description && (
              <p className="text-sm mt-1" style={{ opacity: 0.85 }}>{result.description}</p>
            )}
            <div className="flex gap-3 mt-3 text-sm">
              {result.servings && (
                <span className="bg-white/20 px-2 py-1 rounded-lg">{result.servings}</span>
              )}
              {result.totalTime && (
                <span className="bg-white/20 px-2 py-1 rounded-lg">{result.totalTime}</span>
              )}
              {result.difficulty && (
                <span className="bg-white/20 px-2 py-1 rounded-lg">{result.difficulty}</span>
              )}
            </div>
          </div>

          {/* 재료 */}
          <div className="p-4" style={{ borderBottom: '1px solid var(--border-light)' }}>
            <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span className="text-lg">🥬</span> 재료
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {result.ingredients.map((ing, idx) => (
                <div key={idx} className="flex justify-between text-sm p-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{ing.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{ing.amount} {ing.unit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 조리 순서 */}
          <div className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span className="text-lg">👨‍🍳</span> 조리 순서
            </h3>
            <div className="space-y-4">
              {result.steps.map((step) => (
                <div key={step.order} className="flex gap-3">
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'var(--gradient-accent)' }}
                  >
                    {step.order}
                  </div>
                  <div className="flex-1">
                    <p style={{ color: 'var(--text-secondary)' }}>{step.instruction}</p>
                    {step.duration && (
                      <span
                        className="inline-block mt-1 text-xs px-2 py-0.5 rounded"
                        style={{ color: 'var(--accent-600)', background: 'var(--accent-50)' }}
                      >
                        {step.duration}
                      </span>
                    )}
                    {step.tip && (
                      <p className="mt-1 text-sm italic" style={{ color: 'var(--text-muted)' }}>
                        💡 {step.tip}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="p-4 space-y-2" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)' }}>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                disabled={saved}
                className="flex-1 py-3 border-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderColor: 'var(--accent-400)', color: 'var(--accent-600)' }}
              >
                ✏️ 수정하기
              </button>
              <button
                onClick={handleSave}
                disabled={saved}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 text-white ${
                  saved
                    ? ''
                    : 'hover:shadow-lg active:scale-[0.98]'
                }`}
                style={{ background: saved ? 'var(--success-text)' : 'var(--gradient-accent)' }}
              >
                {saved ? '✓ 저장됨' : '📖 저장하기'}
              </button>
            </div>
            {saved && (
              <p className="text-center text-sm" style={{ color: 'var(--success-text)' }}>
                레시피 탭에서 확인할 수 있습니다
              </p>
            )}
          </div>
        </div>
      )}

      {/* 빈 상태 */}
      {!result && !isSearching && !error && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p style={{ color: 'var(--text-muted)' }}>만들고 싶은 요리를 검색해보세요</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['김치찌개', '카르보나라', '된장찌개', '불고기'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setDishName(suggestion)}
                className="px-3 py-1.5 rounded-full text-sm transition-colors"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
