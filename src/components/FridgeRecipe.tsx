'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { addRecipe as addRecipeToDB } from '@/lib/supabase/recipes';
import { Ingredient, CookingStep } from '@/types';

interface RecipeRecommendation {
  name: string;
  description: string;
  matchedIngredients: string[];
  missingIngredients: string[];
  difficulty: string;
  cookingTime: string;
  steps: string[];
}

export default function FridgeRecipe() {
  const { user } = useAuth();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [preference, setPreference] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecipeRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeRecommendation | null>(null);

  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedIngredients, setEditedIngredients] = useState<string[]>([]);
  const [editedSteps, setEditedSteps] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const addIngredient = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const getRecommendations = async () => {
    if (ingredients.length === 0) {
      setError('재료를 1개 이상 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    setSelectedRecipe(null);

    try {
      const response = await fetch('/api/fridge-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, preference }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '레시피 추천에 실패했습니다.');
      }

      setRecommendations(data.recommendations || []);
    } catch (err) {
      console.error('Recommendation error:', err);
      setError(err instanceof Error ? err.message : '레시피 추천 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickIngredients = [
    '계란', '양파', '마늘', '대파', '김치', '두부', '돼지고기', '소고기',
    '닭고기', '감자', '당근', '고추', '버섯', '파프리카', '애호박'
  ];

  const addQuickIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
    }
  };

  // 편집 모드 시작
  const startEditing = () => {
    if (selectedRecipe) {
      setEditedName(selectedRecipe.name);
      setEditedDescription(selectedRecipe.description);
      setEditedIngredients([...selectedRecipe.matchedIngredients, ...selectedRecipe.missingIngredients]);
      setEditedSteps([...selectedRecipe.steps]);
      setIsEditing(true);
    }
  };

  // 편집 취소
  const cancelEditing = () => {
    setIsEditing(false);
    setNewIngredient('');
  };

  // 재료 추가 (편집 모드)
  const addEditIngredient = () => {
    const trimmed = newIngredient.trim();
    if (trimmed && !editedIngredients.includes(trimmed)) {
      setEditedIngredients([...editedIngredients, trimmed]);
      setNewIngredient('');
    }
  };

  // 재료 삭제 (편집 모드)
  const removeEditIngredient = (ing: string) => {
    setEditedIngredients(editedIngredients.filter(i => i !== ing));
  };

  // 조리 순서 수정
  const updateStep = (index: number, value: string) => {
    const newSteps = [...editedSteps];
    newSteps[index] = value;
    setEditedSteps(newSteps);
  };

  // 조리 순서 추가
  const addStep = () => {
    setEditedSteps([...editedSteps, '']);
  };

  // 조리 순서 삭제
  const removeStep = (index: number) => {
    setEditedSteps(editedSteps.filter((_, i) => i !== index));
  };

  // 레시피 저장
  const saveRecipe = async () => {
    if (!user) {
      setError('레시피를 저장하려면 로그인이 필요합니다.');
      return;
    }

    const name = isEditing ? editedName : selectedRecipe?.name;
    const description = isEditing ? editedDescription : selectedRecipe?.description;
    const recipeIngredients = isEditing ? editedIngredients : [...(selectedRecipe?.matchedIngredients || []), ...(selectedRecipe?.missingIngredients || [])];
    const recipeSteps = isEditing ? editedSteps : selectedRecipe?.steps || [];

    if (!name) {
      setError('레시피 이름을 입력해주세요.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const ingredientsList: Ingredient[] = recipeIngredients.map(ing => ({
        name: ing,
        amount: '',
        unit: ''
      }));

      const stepsList: CookingStep[] = recipeSteps.map((step, idx) => ({
        order: idx + 1,
        instruction: step
      }));

      await addRecipeToDB({
        title: name,
        description: description || '',
        ingredients: ingredientsList,
        steps: stepsList,
        source: 'manual',
      });

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setSelectedRecipe(null);
        setIsEditing(false);
      }, 2000);
    } catch (err) {
      console.error('Save error:', err);
      setError('레시피 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  // 상세 레시피 보기 / 편집
  if (selectedRecipe) {
    return (
      <div className="p-5 pb-28">
        <button
          onClick={() => {
            setSelectedRecipe(null);
            setIsEditing(false);
          }}
          className="flex items-center gap-2 mb-4 text-sm font-medium transition-colors"
          style={{ color: 'var(--accent-600)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          목록으로
        </button>

        {/* 저장 성공 메시지 */}
        {saveSuccess && (
          <div
            className="p-4 rounded-xl mb-4 text-sm flex items-center gap-2"
            style={{ background: 'var(--success-bg)', color: 'var(--success-text)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            레시피가 저장되었습니다!
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div
            className="p-4 rounded-xl mb-4 text-sm"
            style={{ background: 'var(--error-bg)', color: 'var(--error-text)' }}
          >
            {error}
          </div>
        )}

        <div className="recipe-card p-5 mb-4">
          {isEditing ? (
            <>
              {/* 편집 모드 */}
              <div className="mb-4">
                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>
                  레시피 이름
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="input-field w-full"
                />
              </div>
              <div className="mb-4">
                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>
                  설명
                </label>
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  rows={2}
                  className="input-field w-full resize-none"
                />
              </div>
            </>
          ) : (
            <>
              {/* 보기 모드 */}
              <h2 className="font-handwriting text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
                {selectedRecipe.name}
              </h2>
              <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
                {selectedRecipe.description}
              </p>
              <div className="flex gap-3 mb-4">
                <span className="badge-subtle">{selectedRecipe.difficulty}</span>
                <span className="badge-subtle">{selectedRecipe.cookingTime}</span>
              </div>
            </>
          )}

          {/* 재료 정보 */}
          {isEditing ? (
            <div className="mb-4">
              <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>
                재료
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addEditIngredient())}
                  placeholder="재료 추가"
                  className="input-field flex-1 text-sm py-2"
                />
                <button onClick={addEditIngredient} className="btn-primary px-3 py-2 text-sm">
                  추가
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editedIngredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                    style={{ background: 'var(--accent-100)', color: 'var(--accent-700)' }}
                  >
                    {ing}
                    <button
                      onClick={() => removeEditIngredient(ing)}
                      className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-white/50"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="content-card p-3">
                <h4 className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                  보유 재료
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedRecipe.matchedIngredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ background: 'var(--success-bg)', color: 'var(--success-text)' }}
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
              <div className="content-card p-3">
                <h4 className="text-xs font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                  필요 재료
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedRecipe.missingIngredients.length > 0 ? (
                    selectedRecipe.missingIngredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ background: 'var(--error-bg)', color: 'var(--error-text)' }}
                      >
                        {ing}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>없음</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 조리 순서 */}
        <div className="recipe-card p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
              조리 순서
            </h3>
            {isEditing && (
              <button
                onClick={addStep}
                className="text-xs px-3 py-1 rounded-lg"
                style={{ background: 'var(--accent-100)', color: 'var(--accent-700)' }}
              >
                + 단계 추가
              </button>
            )}
          </div>
          <div className="space-y-4">
            {(isEditing ? editedSteps : selectedRecipe.steps).map((step, idx) => (
              <div key={idx} className="flex gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: 'var(--accent-100)', color: 'var(--accent-700)' }}
                >
                  {idx + 1}
                </div>
                {isEditing ? (
                  <div className="flex-1 flex gap-2">
                    <textarea
                      value={step}
                      onChange={(e) => updateStep(idx, e.target.value)}
                      rows={2}
                      className="input-field flex-1 text-sm resize-none"
                    />
                    <button
                      onClick={() => removeStep(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <p className="text-sm pt-1" style={{ color: 'var(--text-secondary)' }}>
                    {step}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 버튼들 */}
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={cancelEditing}
                className="flex-1 py-3 rounded-xl font-medium border"
                style={{ borderColor: 'var(--border-medium)', color: 'var(--text-secondary)' }}
              >
                취소
              </button>
              <button
                onClick={saveRecipe}
                disabled={isSaving}
                className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                style={{ background: 'var(--gradient-accent)', color: 'white' }}
              >
                {isSaving ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    저장 중...
                  </>
                ) : (
                  '저장하기'
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={startEditing}
                className="flex-1 py-3 rounded-xl font-medium border flex items-center justify-center gap-2"
                style={{ borderColor: 'var(--border-medium)', color: 'var(--text-secondary)' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                수정하기
              </button>
              <button
                onClick={saveRecipe}
                disabled={isSaving || !user}
                className="flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ background: 'var(--gradient-accent)', color: 'white' }}
              >
                {isSaving ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    저장 중...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    {user ? '저장하기' : '로그인 필요'}
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {!user && !isEditing && (
          <p className="text-xs text-center mt-3" style={{ color: 'var(--text-muted)' }}>
            레시피를 저장하려면 로그인이 필요합니다
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="p-5 pb-28">
      {/* 재료 입력 */}
      <div className="recipe-card p-5 mb-4">
        <h3 className="font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="text-xl">🥬</span> 냉장고 재료 입력
        </h3>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="재료를 입력하세요"
            className="input-field flex-1"
          />
          <button
            onClick={addIngredient}
            className="btn-primary px-4"
          >
            추가
          </button>
        </div>

        {/* 빠른 추가 버튼 */}
        <div className="mb-4">
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>빠른 추가</p>
          <div className="flex flex-wrap gap-1.5">
            {quickIngredients.map((ing) => (
              <button
                key={ing}
                onClick={() => addQuickIngredient(ing)}
                disabled={ingredients.includes(ing)}
                className="text-xs px-2.5 py-1.5 rounded-full border transition-all"
                style={{
                  background: ingredients.includes(ing) ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                  borderColor: 'var(--border-light)',
                  color: ingredients.includes(ing) ? 'var(--text-muted)' : 'var(--text-secondary)',
                  opacity: ingredients.includes(ing) ? 0.5 : 1,
                }}
              >
                {ing}
              </button>
            ))}
          </div>
        </div>

        {/* 입력된 재료 목록 */}
        {ingredients.length > 0 && (
          <div>
            <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
              입력된 재료 ({ingredients.length}개)
            </p>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing) => (
                <span
                  key={ing}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm"
                  style={{ background: 'var(--accent-100)', color: 'var(--accent-700)' }}
                >
                  {ing}
                  <button
                    onClick={() => removeIngredient(ing)}
                    className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 선호도 입력 */}
      <div className="recipe-card p-5 mb-4">
        <h3 className="font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="text-xl">🍽️</span> 먹고 싶은 음식 (선택)
        </h3>
        <input
          type="text"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          placeholder="예: 매운 음식, 국물 요리, 간단한 볶음 등"
          className="input-field w-full"
        />
        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          원하는 음식 종류나 스타일을 입력하면 더 정확한 추천을 받을 수 있어요
        </p>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div
          className="p-4 rounded-xl mb-4 text-sm"
          style={{ background: 'var(--error-bg)', color: 'var(--error-text)' }}
        >
          {error}
        </div>
      )}

      {/* 추천 버튼 */}
      <button
        onClick={getRecommendations}
        disabled={isLoading || ingredients.length === 0}
        className="w-full py-4 rounded-2xl font-medium shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{
          background: 'var(--gradient-accent)',
          color: 'white',
        }}
      >
        {isLoading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            AI가 레시피를 찾고 있어요...
          </>
        ) : (
          <>
            <span className="text-lg">🔍</span>
            레시피 추천받기
          </>
        )}
      </button>

      {/* 추천 결과 */}
      {recommendations.length > 0 && (
        <div className="mt-6">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <span>✨</span> 추천 레시피
          </h3>
          <div className="space-y-3">
            {recommendations.map((recipe, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedRecipe(recipe)}
                className="recipe-card p-4 w-full text-left"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {recipe.name}
                  </h4>
                  <div className="flex gap-2">
                    <span className="badge-subtle text-xs">{recipe.difficulty}</span>
                    <span className="badge-subtle text-xs">{recipe.cookingTime}</span>
                  </div>
                </div>
                <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  {recipe.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ background: 'var(--success-bg)', color: 'var(--success-text)' }}
                    >
                      보유 {recipe.matchedIngredients.length}개
                    </span>
                    {recipe.missingIngredients.length > 0 && (
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ background: 'var(--error-bg)', color: 'var(--error-text)' }}
                      >
                        필요 {recipe.missingIngredients.length}개
                      </span>
                    )}
                  </div>
                  <span className="text-xs" style={{ color: 'var(--accent-600)' }}>
                    자세히 보기 →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 안내 문구 */}
      {recommendations.length === 0 && !isLoading && (
        <div className="mt-6 recipe-card p-5" style={{ background: 'var(--gradient-warm)' }}>
          <h3 className="font-handwriting text-lg mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span>💡</span> 이렇게 사용하세요
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-500)' }}>1.</span>
              냉장고에 있는 재료를 입력하세요
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-500)' }}>2.</span>
              먹고 싶은 음식 종류를 선택적으로 입력하세요
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-500)' }}>3.</span>
              AI가 재료에 맞는 레시피를 추천해드려요
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: 'var(--accent-500)' }}>4.</span>
              마음에 드는 레시피를 수정하고 저장하세요
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
