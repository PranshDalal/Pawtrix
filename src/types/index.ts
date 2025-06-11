export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  breed?: string;
  age?: number;
  avatar?: string;
  createdAt: string;
  personality?: PersonalityProfile;
}

export interface Analysis {
  id: string;
  petId: string;
  petName: string;
  fileType: 'audio' | 'video';
  fileName: string;
  detectedSpecies: 'dog' | 'cat';
  confidence: number;
  mood: {
    primary: string;
    secondary?: string;
    confidence: number;
  };
  description: string;
  suggestion: string;
  timestamp: string;
}

export interface MoodResult {
  mood: {
    primary: string;
    secondary?: string;
    confidence: number;
  };
  description: string;
  suggestion: string;
  detectedSpecies: 'dog' | 'cat';
  confidence: number;
}

export interface PersonalityProfile {
  type: string;
  description: string;
  traits: string[];
  icon: string;
  color: string;
  lastUpdated: string;
  analysisCount: number;
  moodFrequency: Record<string, number>;
}

export interface MoodCalendarDay {
  date: string;
  mood: string;
  color: string;
  analyses: Analysis[];
}

export interface MoodTrend {
  week: string;
  happy: number;
  excited: number;
  anxious: number;
  playful: number;
  content: number;
  curious: number;
}

export interface UserSubscription {
  isActive: boolean;
  plan: 'free' | 'pawtrix_plus';
  startDate?: string;
  endDate?: string;
  usageCount: number;
  lastResetDate: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  affiliateUrl: string;
  category: 'toy' | 'food' | 'health' | 'training' | 'comfort';
  targetMoods: string[];
  targetPersonalities: string[];
  rating: number;
  reviewCount: number;
}

export interface UpsellTrigger {
  type: 'usage_limit' | 'mood_pattern' | 'feature_access' | 'personality_unlock';
  condition: string;
  priority: number;
}