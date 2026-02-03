'use client';

import { useState, useRef } from 'react';
import { useStore } from '@/store/useStore';
import RecipeEditor from './RecipeEditor';
import { AnalysisResult, Recipe, FeedbackEntry } from '@/types';
import Image from 'next/image';
import { addRecipe as addRecipeToDB } from '@/lib/supabase/recipes';

export default function ImageAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const { getFeedbackForImage } = useStore();

  // 이미지 압축 함수
  const compressImage = (file: File, maxSize: number = 512): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        let { width, height } = img;

        // 비율 유지하며 리사이즈 (긴 변 기준)
        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        // JPEG로 압축 (품질 0.7)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedBase64.split(',')[1]);
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일 체크
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    // 파일 크기 체크 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('이미지 크기는 10MB 이하여야 합니다.');
      return;
    }

    setMimeType('image/jpeg'); // 압축 후 항상 JPEG
    setError(null);

    // 미리보기용 URL
    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(previewUrl);

    // 이미지 압축 후 Base64 변환
    try {
      const compressedBase64 = await compressImage(file);
      setImageBase64(compressedBase64);
    } catch {
      setError('이미지 처리 중 오류가 발생했습니다.');
    }
  };

  const analyzeImage = async () => {
    if (!imageBase64) {
      setError('이미지를 먼저 선택해주세요.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // 서버에서 피드백 가져오기 (로컬 + 서버 병합)
      let serverFeedback: FeedbackEntry[] = [];
      try {
        const fbRes = await fetch('/api/feedback?source=image&limit=10');
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          serverFeedback = fbData.feedback || [];
        }
      } catch {
        // 서버 피드백 실패해도 계속 진행
      }

      // 로컬 피드백과 서버 피드백 병합 (중복 제거)
      const localFeedback = getFeedbackForImage();
      const localIds = new Set(localFeedback.map(f => f.id));
      const mergedFeedback = [
        ...localFeedback,
        ...serverFeedback.filter(f => !localIds.has(f.id))
      ].slice(0, 15);

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          mimeType,
          feedbackHistory: mergedFeedback,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '분석 실패');
      }

      setAnalysisResult(result);
    } catch (err) {
      console.error('Analysis error:', err);
      const message = err instanceof Error ? err.message : '이미지 분석 중 오류가 발생했습니다.';
      setError(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRecipe = async (recipe: Recipe) => {
    setIsSaving(true);

    let cloudinaryUrl: string | undefined;

    // 이미지를 Cloudinary에 업로드
    if (imageBase64) {
      try {
        const uploadRes = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64, mimeType }),
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          cloudinaryUrl = uploadData.url;
        }
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }

    // Supabase에 저장
    await addRecipeToDB({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      source: 'image',
      imageUrl: cloudinaryUrl || selectedImage || undefined,
    });

    setIsSaving(false);
    resetAll();
  };

  const resetAll = () => {
    setSelectedImage(null);
    setImageBase64(null);
    setAnalysisResult(null);
    setError(null);
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
    }
  };

  if (analysisResult) {
    return (
      <div className="p-4">
        {selectedImage && (
          <div className="mb-4 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={selectedImage}
              alt="분석된 음식"
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
          </div>
        )}
        <RecipeEditor
          initialData={analysisResult}
          originalContext={`이미지 분석 - ${analysisResult.title}`}
          onSave={handleSaveRecipe}
          onCancel={() => setAnalysisResult(null)}
        />
      </div>
    );
  }

  return (
    <div className="p-4 pb-24">
      {/* 숨겨진 input들 */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageSelect}
        className="hidden"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />

      {/* 이미지 미리보기 또는 선택 버튼 */}
      {selectedImage ? (
        <div className="recipe-card p-4 mb-6">
          <div className="relative">
            <Image
              src={selectedImage}
              alt="선택된 이미지"
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-xl"
            />
            <button
              onClick={resetAll}
              className="absolute top-3 right-3 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* 카메라 버튼 */}
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="recipe-card p-6 flex flex-col items-center gap-3 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-400"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-warm-700 font-medium">카메라 촬영</span>
          </button>

          {/* 갤러리 버튼 */}
          <button
            onClick={() => galleryInputRef.current?.click()}
            className="recipe-card p-6 flex flex-col items-center gap-3 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-400"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-warm-700 font-medium">갤러리 선택</span>
          </button>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* 분석 버튼 */}
      {selectedImage && (
        <button
          onClick={analyzeImage}
          disabled={isAnalyzing}
          className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-medium shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              AI가 분석 중...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              레시피 추측하기
            </>
          )}
        </button>
      )}

      {/* 안내 문구 */}
      {!selectedImage && (
        <div className="recipe-card p-5 bg-gradient-to-br from-amber-50 to-orange-50">
          <h3 className="font-handwriting text-xl text-warm-800 mb-3 flex items-center gap-2">
            <span>💡</span> 이렇게 사용하세요
          </h3>
          <ul className="space-y-2 text-sm text-warm-600">
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              완성된 요리 사진을 찍거나 업로드하세요
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              AI가 재료와 조리법을 추측해드려요
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              틀린 부분은 수정하면 점점 정확해져요
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
