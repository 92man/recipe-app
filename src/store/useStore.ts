import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Recipe, FeedbackEntry } from '@/types';

interface AppState {
  recipes: Recipe[];
  feedbackEntries: FeedbackEntry[];
  activeTab: 'voice' | 'image' | 'list' | 'search';

  // Actions
  setActiveTab: (tab: 'voice' | 'image' | 'list' | 'search') => void;
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (id: string, updates: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  addFeedback: (feedback: FeedbackEntry) => void;
  getFeedbackForContext: (context: string) => FeedbackEntry[];
  getFeedbackForImage: (title?: string) => FeedbackEntry[];
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      recipes: [],
      feedbackEntries: [],
      activeTab: 'voice',

      setActiveTab: (tab) => set({ activeTab: tab }),

      addRecipe: (recipe) =>
        set((state) => ({
          recipes: [recipe, ...state.recipes],
        })),

      updateRecipe: (id, updates) =>
        set((state) => ({
          recipes: state.recipes.map((r) =>
            r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
          ),
        })),

      deleteRecipe: (id) =>
        set((state) => ({
          recipes: state.recipes.filter((r) => r.id !== id),
        })),

      addFeedback: (feedback) =>
        set((state) => ({
          feedbackEntries: [feedback, ...state.feedbackEntries].slice(0, 100), // 최근 100개만 유지
        })),

      getFeedbackForContext: (context) => {
        const entries = get().feedbackEntries;
        // 관련 피드백 찾기 (간단한 키워드 매칭)
        const keywords = context.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        return entries.filter((entry) => {
          const entryContext = entry.context.toLowerCase();
          return keywords.some((keyword) => entryContext.includes(keyword));
        }).slice(0, 5); // 최대 5개 피드백만 사용
      },

      // 이미지 분석용 피드백 가져오기 (유사 음식 우선)
      getFeedbackForImage: (title?: string) => {
        const entries = get().feedbackEntries.filter(e => e.source === 'image');

        if (!title) {
          return entries.slice(0, 10);
        }

        // 유사한 음식 이름 우선 정렬
        const titleLower = title.toLowerCase();
        const scored = entries.map(entry => {
          let score = 0;
          const entryTitle = (entry.title || '').toLowerCase();

          // 완전 일치
          if (entryTitle === titleLower) score = 100;
          // 부분 일치
          else if (entryTitle.includes(titleLower) || titleLower.includes(entryTitle)) score = 50;
          // 키워드 일치
          else {
            const titleWords = titleLower.split(/\s+/);
            const entryWords = entryTitle.split(/\s+/);
            titleWords.forEach(w => {
              if (entryWords.some(ew => ew.includes(w) || w.includes(ew))) score += 10;
            });
          }

          return { entry, score };
        });

        return scored
          .sort((a, b) => b.score - a.score)
          .slice(0, 10)
          .map(s => s.entry);
      },
    }),
    {
      name: 'recipe-storage',
    }
  )
);
