'use client';

import { useState, useRef } from 'react';
import { useStore } from '@/store/useStore';
import RecipeEditor from './RecipeEditor';
import { AnalysisResult, Recipe, FeedbackEntry } from '@/types';
import Image from 'next/image';
import { addRecipe as addRecipeToDB } from '@/lib/supabase/recipes';

type AnalysisMode = 'image' | 'youtube';

export default function ImageAnalyzer() {
  const [mode, setMode] = useState<AnalysisMode>('image');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // YouTube 관련 상태
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);

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

    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('이미지 크기는 10MB 이하여야 합니다.');
      return;
    }

    setMimeType('image/jpeg');
    setError(null);

    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(previewUrl);

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

  const analyzeYoutube = async () => {
    if (!youtubeUrl.trim()) {
      setError('YouTube URL을 입력해주세요.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeUrl }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '분석 실패');
      }

      setVideoId(result.videoId);
      setAnalysisResult(result);
    } catch (err) {
      console.error('YouTube analysis error:', err);
      const message = err instanceof Error ? err.message : 'YouTube 분석 중 오류가 발생했습니다.';
      setError(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRecipe = async (recipe: Recipe) => {
    setIsSaving(true);

    let cloudinaryUrl: string | undefined;

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

    await addRecipeToDB({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      source: mode === 'youtube' ? 'youtube' : 'image',
      imageUrl: cloudinaryUrl || selectedImage || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : undefined),
    });

    setIsSaving(false);
    resetAll();
  };

  const resetAll = () => {
    setSelectedImage(null);
    setImageBase64(null);
    setAnalysisResult(null);
    setError(null);
    setYoutubeUrl('');
    setVideoId(null);
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
        {/* 이미지 또는 YouTube 썸네일 */}
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
        {videoId && !selectedImage && (
          <div className="mb-4 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="YouTube 썸네일"
              width={400}
              height={300}
              className="w-full h-48 object-cover"
              unoptimized
            />
          </div>
        )}
        <RecipeEditor
          initialData={analysisResult}
          originalContext={mode === 'youtube' ? `YouTube 분석 - ${analysisResult.title}` : `이미지 분석 - ${analysisResult.title}`}
          onSave={handleSaveRecipe}
          onCancel={() => setAnalysisResult(null)}
        />
      </div>
    );
  }

  return (
    <div className="p-4 pb-24">
      {/* 모드 선택 탭 */}
      <div className="flex gap-2 mb-6 p-1 bg-warm-100 rounded-2xl">
        <button
          onClick={() => { setMode('image'); setError(null); }}
          className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
            mode === 'image'
              ? 'bg-white text-accent-600 shadow-soft'
              : 'text-warm-500 hover:text-warm-700'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            이미지 분석
          </span>
        </button>
        <button
          onClick={() => { setMode('youtube'); setError(null); }}
          className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
            mode === 'youtube'
              ? 'bg-white text-red-600 shadow-soft'
              : 'text-warm-500 hover:text-warm-700'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube 분석
          </span>
        </button>
      </div>

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

      {/* 이미지 분석 모드 */}
      {mode === 'image' && (
        <>
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
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="recipe-card p-6 flex flex-col items-center gap-3 hover:shadow-lifted transition-all duration-300 border-2 border-transparent hover:border-accent-400"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-warm-700 font-medium">카메라 촬영</span>
              </button>

              <button
                onClick={() => galleryInputRef.current?.click()}
                className="recipe-card p-6 flex flex-col items-center gap-3 hover:shadow-lifted transition-all duration-300 border-2 border-transparent hover:border-purple-400"
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

          {!selectedImage && (
            <div className="recipe-card p-5 bg-gradient-to-br from-amber-50 to-orange-50">
              <h3 className="font-handwriting text-xl text-warm-800 mb-3 flex items-center gap-2">
                <span>💡</span> 이렇게 사용하세요
              </h3>
              <ul className="space-y-2 text-sm text-warm-600">
                <li className="flex items-start gap-2">
                  <span className="text-accent-500">•</span>
                  완성된 요리 사진을 찍거나 업로드하세요
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500">•</span>
                  AI가 재료와 조리법을 추측해드려요
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500">•</span>
                  틀린 부분은 수정하면 점점 정확해져요
                </li>
              </ul>
            </div>
          )}
        </>
      )}

      {/* YouTube 분석 모드 */}
      {mode === 'youtube' && (
        <>
          <div className="recipe-card p-5 mb-6">
            <label className="block text-sm font-medium text-warm-700 mb-2">
              YouTube 영상 링크
            </label>
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="input-field w-full"
            />
            <p className="text-xs text-warm-400 mt-2">
              요리 영상의 URL을 붙여넣으세요. 자막이 있는 영상만 분석 가능합니다.
            </p>
          </div>

          <button
            onClick={analyzeYoutube}
            disabled={isAnalyzing || !youtubeUrl.trim()}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-medium shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-6"
          >
            {isAnalyzing ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                자막 분석 중...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                레시피 추출하기
              </>
            )}
          </button>

          <div className="recipe-card p-5 bg-gradient-to-br from-red-50 to-orange-50">
            <h3 className="font-handwriting text-xl text-warm-800 mb-3 flex items-center gap-2">
              <span>📺</span> YouTube 레시피 추출
            </h3>
            <ul className="space-y-2 text-sm text-warm-600">
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                요리 영상 링크를 붙여넣으세요
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                AI가 자막을 분석하여 레시피를 정리해요
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                한국어/영어 자막이 있는 영상만 가능해요
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                백종원, 요리왕 등 인기 채널 추천!
              </li>
            </ul>
          </div>
        </>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
