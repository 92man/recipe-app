'use client';

import { useState, useRef } from 'react';
import { useStore } from '@/store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { AnalysisResult, Recipe, Ingredient, CookingStep, FeedbackEntry } from '@/types';

interface RecipeEditorProps {
  initialData: AnalysisResult;
  originalContext: string;
  onSave: (recipe: Recipe) => void;
  onCancel: () => void;
}

export default function RecipeEditor({
  initialData,
  originalContext,
  onSave,
  onCancel,
}: RecipeEditorProps) {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialData.ingredients);
  const [steps, setSteps] = useState<CookingStep[]>(initialData.steps);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { addFeedback } = useStore();

  const newIngredientRef = useRef<HTMLInputElement>(null);
  const newStepRef = useRef<HTMLTextAreaElement>(null);

  const markChanged = () => {
    if (!hasChanges) setHasChanges(true);
  };

  // 재료 관련 함수
  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
    markChanged();
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
    markChanged();
    // 새 입력폼으로 스크롤 및 포커스
    setTimeout(() => {
      newIngredientRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      newIngredientRef.current?.focus();
    }, 100);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
    markChanged();
  };

  // 단계 관련 함수
  const updateStep = (index: number, field: keyof CookingStep, value: string | number) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
    markChanged();
  };

  const addStep = () => {
    setSteps([...steps, { order: steps.length + 1, instruction: '' }]);
    markChanged();
    // 새 입력폼으로 스크롤 및 포커스
    setTimeout(() => {
      newStepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      newStepRef.current?.focus();
    }, 100);
  };

  const removeStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index).map((step, i) => ({
      ...step,
      order: i + 1,
    }));
    setSteps(updated);
    markChanged();
  };

  const handleSave = async () => {
    if (isSaving) return; // 중복 클릭 방지
    setIsSaving(true);

    try {
      // 수정이 있으면 피드백으로 저장 (로컬 + 서버)
      if (hasChanges) {
        const feedback: FeedbackEntry = {
          id: uuidv4(),
          recipeId: '', // 나중에 업데이트
          title: title, // 음식 이름 저장
          originalData: {
            title: initialData.title,
            ingredients: initialData.ingredients,
            steps: initialData.steps,
          },
          correctedData: {
            title: title,
            ingredients,
            steps,
          },
          context: originalContext,
          source: originalContext.includes('이미지') ? 'image' : 'voice',
          createdAt: new Date().toISOString(),
        };

        // 로컬 저장
        addFeedback(feedback);

        // 서버 저장 (비동기, 실패해도 계속 진행)
        fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feedback),
        }).catch(() => {});
      }

      const recipe: Recipe = {
        id: uuidv4(),
        title,
        description,
        ingredients: ingredients.filter((i) => i.name.trim()),
        steps: steps.filter((s) => s.instruction.trim()),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: 'manual',
      };

      await onSave(recipe);
    } catch (error) {
      console.error('저장 실패:', error);
      setIsSaving(false);
    }
  };

  return (
    <div className="pb-24">
      {/* 신뢰도 표시 */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-warm-500">AI 신뢰도:</span>
        <div className="flex-1 h-2 bg-warm-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-green-500 transition-all"
            style={{ width: `${initialData.confidence * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-warm-700">
          {Math.round(initialData.confidence * 100)}%
        </span>
      </div>

      {hasChanges && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          수정 사항은 다음 분석 시 AI 학습에 반영됩니다
        </div>
      )}

      {/* 제목 */}
      <div className="recipe-card p-5 mb-4">
        <label className="block text-sm font-medium text-warm-600 mb-2">요리 이름</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            markChanged();
          }}
          className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all text-warm-800 font-handwriting text-xl"
          placeholder="요리 이름을 입력하세요"
        />
      </div>

      {/* 설명 */}
      <div className="recipe-card p-5 mb-4">
        <label className="block text-sm font-medium text-warm-600 mb-2">설명</label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            markChanged();
          }}
          rows={2}
          className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all text-warm-700 resize-none"
          placeholder="간단한 설명을 입력하세요"
        />
      </div>

      {/* 재료 */}
      <div className="recipe-card p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-handwriting text-xl text-warm-800">🥬 재료</h3>
          <button
            onClick={addIngredient}
            className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            추가
          </button>
        </div>

        <div className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                ref={index === ingredients.length - 1 ? newIngredientRef : null}
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                placeholder="재료명"
                className="flex-1 px-3 py-2 border border-warm-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-sm"
              />
              <input
                type="text"
                value={ingredient.amount}
                onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                placeholder="양"
                className="w-16 px-3 py-2 border border-warm-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-sm text-center"
              />
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                placeholder="단위"
                className="w-16 px-3 py-2 border border-warm-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-sm text-center"
              />
              <button
                onClick={() => removeIngredient(index)}
                className="p-2 text-warm-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 조리 단계 */}
      <div className="recipe-card p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-handwriting text-xl text-warm-800">👨‍🍳 조리 순서</h3>
          <button
            onClick={addStep}
            className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            추가
          </button>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                {step.order}
              </div>
              <div className="flex-1 space-y-2">
                <textarea
                  ref={index === steps.length - 1 ? newStepRef : null}
                  value={step.instruction}
                  onChange={(e) => updateStep(index, 'instruction', e.target.value)}
                  placeholder="조리 방법을 입력하세요"
                  rows={2}
                  className="w-full px-3 py-2 border border-warm-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-sm resize-none"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={step.duration || ''}
                    onChange={(e) => updateStep(index, 'duration', e.target.value)}
                    placeholder="⏱️ 시간"
                    className="w-24 px-2 py-1 border border-warm-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-xs"
                  />
                  <input
                    type="text"
                    value={step.tip || ''}
                    onChange={(e) => updateStep(index, 'tip', e.target.value)}
                    placeholder="💡 팁 (선택)"
                    className="flex-1 px-2 py-1 border border-warm-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none text-xs"
                  />
                </div>
              </div>
              <button
                onClick={() => removeStep(index)}
                className="p-2 text-warm-400 hover:text-red-500 transition-colors self-start"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="flex-1 py-4 border-2 border-warm-300 text-warm-700 rounded-2xl font-medium hover:bg-warm-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-medium shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              저장하기
            </>
          )}
        </button>
      </div>
    </div>
  );
}
