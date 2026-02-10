
export enum PromptModel {
  GENERAL = 'General Image Prompt',
  STRUCTURED = 'Structured Prompt',
  GRAPHIC_DESIGN = 'Graphic Design',
  JSON = 'JSON Prompt',
  FLUX = 'Flux Prompt',
  MIDJOURNEY = 'Midjourney',
  STABLE_DIFFUSION = 'Stable Diffusion',
  GEMINI_PROMPT = 'Gemini Prompt'
}

export interface UserState {
  isSubscriber: boolean;
  tier: 'Free' | 'Standard' | 'Pro' | 'Ultimate';
  dailyUsesLeft: number;
  monthlyCredits: number;
}

export interface InspirationItem {
  id: string;
  imageUrl: string;
  prompt: string;
  category: string;
}

export interface TutorialArticle {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
}
