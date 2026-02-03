import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Recipe, FeedbackEntry } from '@/types';

interface AppState {
  recipes: Recipe[];
  feedbackEntries: FeedbackEntry[];
  activeTab: 'voice' | 'image' | 'list' | 'search';
  theme: 'light' | 'dark';

  // Actions
  setActiveTab: (tab: 'voice' | 'image' | 'list' | 'search') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
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
      theme: 'light',

      setActiveTab: (tab) => set({ activeTab: tab }),

      setTheme: (theme) => {
        set({ theme });
        if (typeof window !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
        }
      },

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        if (typeof window !== 'undefined') {
          document.documentElement.setAttribute('data-theme', newTheme);
        }
      },

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
          feedbackEntries: [feedback, ...state.feedbackEntries].slice(0, 100),
        })),

      getFeedbackForContext: (context) => {
        const entries = get().feedbackEntries;
        const keywords = context.toLowerCase().split(/\s+/).filter(w => w.length > 2);
        return entries.filter((entry) => {
          const entryContext = entry.context.toLowerCase();
          return keywords.some((keyword) => entryContext.includes(keyword));
        }).slice(0, 5);
      },

      getFeedbackForImage: (title?: string) => {
        const entries = get().feedbackEntries.filter(e => e.source === 'image');

        if (!title) {
          return entries.slice(0, 10);
        }

        const titleLower = title.toLowerCase();
        const scored = entries.map(entry => {
          let score = 0;
          const entryTitle = (entry.title || '').toLowerCase();

          if (entryTitle === titleLower) score = 100;
          else if (entryTitle.includes(titleLower) || titleLower.includes(entryTitle)) score = 50;
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
