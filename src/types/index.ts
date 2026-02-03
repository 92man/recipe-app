export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface CookingStep {
  order: number;
  instruction: string;
  duration?: string;
  tip?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: Ingredient[];
  steps: CookingStep[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  source: 'voice' | 'image' | 'manual';
  originalTranscript?: string;
}

export interface FeedbackEntry {
  id: string;
  recipeId: string;
  title: string; // 음식 이름
  originalData: {
    title?: string;
    ingredients?: Ingredient[];
    steps?: CookingStep[];
  };
  correctedData: {
    title?: string;
    ingredients?: Ingredient[];
    steps?: CookingStep[];
  };
  context: string; // 원본 텍스트나 이미지 설명
  source: 'voice' | 'image'; // 입력 소스
  createdAt: string;
}

export interface AnalysisResult {
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: CookingStep[];
  confidence: number;
}
