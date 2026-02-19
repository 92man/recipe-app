'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import RecipeEditor from './RecipeEditor';
import { AnalysisResult, Recipe } from '@/types';
import { addRecipe as addRecipeToDB } from '@/lib/supabase/recipes';

// Web Speech API 타입
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event & { error: string }) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [manualNote, setManualNote] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isRecordingRef = useRef(false);
  const accumulatedTranscriptRef = useRef('');
  const { feedbackEntries } = useStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
      }
    }
  }, []);

  const createRecognition = useCallback(() => {
    if (typeof window === 'undefined') return null;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = false; // 단일 인식 모드
    recognition.interimResults = true;
    recognition.lang = 'ko-KR';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0];
      const text = result[0].transcript;

      if (result.isFinal) {
        // 최종 결과: 누적
        accumulatedTranscriptRef.current += text + ' ';
        setTranscript(accumulatedTranscriptRef.current.trim());
        setInterimTranscript('');
      } else {
        // 중간 결과: 현재 인식 중인 텍스트만 표시
        setInterimTranscript(text);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setError('마이크 권한이 필요합니다. 브라우저 설정에서 마이크 권한을 허용해주세요.');
        isRecordingRef.current = false;
        setIsRecording(false);
      } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
        setError(`음성 인식 오류: ${event.error}`);
      }
    };

    recognition.onend = () => {
      // 녹음 중이면 새 인식 시작
      if (isRecordingRef.current) {
        try {
          const newRecognition = createRecognition();
          if (newRecognition) {
            recognitionRef.current = newRecognition;
            newRecognition.start();
          }
        } catch {
          isRecordingRef.current = false;
          setIsRecording(false);
        }
      }
    };

    return recognition;
  }, []);

  const startRecording = useCallback(() => {
    const recognition = createRecognition();
    if (!recognition) {
      setError('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요.');
      return;
    }

    // 기존 transcript 유지하면서 시작
    accumulatedTranscriptRef.current = transcript ? transcript + ' ' : '';

    recognitionRef.current = recognition;
    isRecordingRef.current = true;

    try {
      recognition.start();
      setIsRecording(true);
      setError(null);
      setInterimTranscript('');
    } catch {
      setError('음성 인식을 시작할 수 없습니다.');
    }
  }, [createRecognition, transcript]);

  const stopRecording = useCallback(() => {
    isRecordingRef.current = false;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    setIsRecording(false);

    // 남은 interim을 final로
    if (interimTranscript) {
      accumulatedTranscriptRef.current += interimTranscript + ' ';
      setTranscript(accumulatedTranscriptRef.current.trim());
    }
    setInterimTranscript('');
  }, [interimTranscript]);

  const analyzeTranscript = async () => {
    const combinedText = [transcript.trim(), manualNote.trim()].filter(Boolean).join('\n\n');

    if (!combinedText) {
      setError('음성 녹음이나 텍스트를 입력해주세요.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const relevantFeedback = feedbackEntries.filter((f) =>
        f.context.toLowerCase().includes(combinedText.toLowerCase().slice(0, 50))
      ).slice(0, 3);

      const response = await fetch('/api/analyze-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: combinedText,
          feedbackHistory: relevantFeedback,
        }),
      });

      if (!response.ok) {
        throw new Error('분석 실패');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('레시피 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveRecipe = async (recipe: Recipe) => {
    const combinedText = [transcript.trim(), manualNote.trim()].filter(Boolean).join('\n\n');

    // Supabase에 저장
    await addRecipeToDB({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      source: 'voice',
      originalTranscript: combinedText,
    });

    setAnalysisResult(null);
    setTranscript('');
    setManualNote('');
    accumulatedTranscriptRef.current = '';
  };

  const resetAll = () => {
    setTranscript('');
    setInterimTranscript('');
    setManualNote('');
    setAnalysisResult(null);
    setError(null);
    accumulatedTranscriptRef.current = '';
  };

  if (!isSupported) {
    return (
      <div className="p-6 text-center">
        <div className="recipe-card p-8">
          <p className="text-warm-700 mb-4">
            이 브라우저는 음성 인식을 지원하지 않습니다.
          </p>
          <p className="text-warm-500 text-sm">
            Chrome, Edge, 또는 Safari 브라우저를 사용해주세요.
          </p>
        </div>
      </div>
    );
  }

  if (analysisResult) {
    return (
      <div className="p-4">
        <RecipeEditor
          initialData={analysisResult}
          originalContext={transcript}
          source="voice"
          onSave={handleSaveRecipe}
          onCancel={() => setAnalysisResult(null)}
        />
      </div>
    );
  }

  return (
    <div className="p-4 pb-24">
      {/* 녹음 버튼 */}
      <div className="flex flex-col items-center mb-8">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`relative w-32 h-32 rounded-full transition-all duration-300 ${
            isRecording
              ? 'bg-red-500 shadow-lg shadow-red-300'
              : 'bg-gradient-to-br from-orange-400 to-red-500 shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 hover:scale-105'
          }`}
        >
          {isRecording && (
            <>
              <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30" />
              <span className="absolute inset-0 rounded-full bg-red-400 animate-pulse opacity-20" />
            </>
          )}

          <span className="relative z-10 flex flex-col items-center text-white">
            {isRecording ? (
              <>
                <svg className="w-10 h-10 mb-1" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
                <span className="text-xs font-medium tracking-wide">중지</span>
              </>
            ) : (
              <>
                <svg className="w-10 h-10 mb-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
                <span className="text-xs font-medium tracking-wide">녹음</span>
              </>
            )}
          </span>
        </button>

        <p className="mt-4 text-warm-600 text-sm text-center">
          {isRecording ? (
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              말씀하세요... 레시피를 자유롭게 설명해주세요
            </span>
          ) : (
            '버튼을 눌러 레시피를 말씀해주세요'
          )}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl text-sm" style={{ background: 'var(--error-bg)', borderColor: 'var(--error-border)', color: 'var(--error-text)', border: '1px solid var(--error-border)' }}>
          {error}
        </div>
      )}

      <div className="recipe-card p-5 mb-4 min-h-[150px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-handwriting text-xl text-warm-800">🎙️ 음성 기록</h3>
          {(transcript || manualNote) && (
            <button
              onClick={resetAll}
              className="text-warm-500 text-sm hover:text-warm-700 transition-colors"
            >
              초기화
            </button>
          )}
        </div>

        <div className="text-warm-700 leading-relaxed whitespace-pre-wrap min-h-[80px]">
          {transcript || interimTranscript ? (
            <>
              {transcript}
              {transcript && interimTranscript && ' '}
              <span className="text-warm-400 italic">{interimTranscript}</span>
            </>
          ) : (
            <div className="text-warm-400 text-center py-2">
              <p className="italic mb-2">아직 녹음된 내용이 없습니다</p>
              <p className="text-sm">요리하시면서 필요할 때마다 버튼을 눌러<br/>녹음해두시면 근사한 레시피가 완성됩니다 ✨</p>
            </div>
          )}
        </div>
      </div>

      {/* 텍스트 입력 */}
      <div className="recipe-card p-5 mb-4">
        <h3 className="font-handwriting text-xl text-warm-800 mb-3">✏️ 추가 메모</h3>
        <textarea
          value={manualNote}
          onChange={(e) => setManualNote(e.target.value)}
          placeholder="재료나 조리법을 직접 입력하세요... (선택사항)"
          rows={3}
          className="w-full px-4 py-3 rounded-xl outline-none transition-all resize-none border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-medium)', color: 'var(--text-secondary)' }}
        />
      </div>

      {(transcript || manualNote) && (
        <button
          onClick={analyzeTranscript}
          disabled={isAnalyzing}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-medium shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              레시피로 정리하기
            </>
          )}
        </button>
      )}
    </div>
  );
}
