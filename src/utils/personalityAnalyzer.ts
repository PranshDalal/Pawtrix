import { Analysis, PersonalityProfile } from '../types';

const personalityTypes = {
  'Playful Diva': {
    description: 'High energy and loves being the center of attention! Always ready for fun and games.',
    traits: ['Energetic', 'Attention-seeking', 'Social', 'Dramatic'],
    icon: '👑',
    color: 'coral',
    conditions: (moods: Record<string, number>) => 
      (moods['Excited'] || 0) + (moods['Playful'] || 0) + (moods['Attention-seeking'] || 0) > 60
  },
  'Chill Introvert': {
    description: 'Calm and contemplative, prefers quiet moments and gentle interactions.',
    traits: ['Calm', 'Observant', 'Independent', 'Thoughtful'],
    icon: '🤓',
    color: 'mint',
    conditions: (moods: Record<string, number>) => 
      (moods['Content'] || 0) + (moods['Curious'] || 0) > 50 && (moods['Excited'] || 0) < 20
  },
  'Gentle Giant': {
    description: 'Big heart with a soft soul. Sensitive to changes but incredibly loving.',
    traits: ['Sensitive', 'Loving', 'Protective', 'Gentle'],
    icon: '💝',
    color: 'lavender',
    conditions: (moods: Record<string, number>) => 
      (moods['Anxious'] || 0) > 25 && (moods['Happy'] || 0) + (moods['Content'] || 0) > 40
  },
  'Adventure Seeker': {
    description: 'Always ready for the next big adventure! Curious about everything around them.',
    traits: ['Adventurous', 'Curious', 'Bold', 'Explorer'],
    icon: '🗺️',
    color: 'yellow',
    conditions: (moods: Record<string, number>) => 
      (moods['Curious'] || 0) + (moods['Excited'] || 0) > 55 && (moods['Anxious'] || 0) < 15
  },
  'Foodie Friend': {
    description: 'Life revolves around meal times! Food is love, and love is food.',
    traits: ['Food-motivated', 'Routine-loving', 'Predictable', 'Content'],
    icon: '🍽️',
    color: 'orange',
    conditions: (moods: Record<string, number>) => 
      (moods['Hungry'] || 0) > 30
  },
  'Anxious Angel': {
    description: 'Needs extra love and reassurance. Thrives with routine and gentle care.',
    traits: ['Sensitive', 'Needs-reassurance', 'Loyal', 'Cautious'],
    icon: '😇',
    color: 'blue',
    conditions: (moods: Record<string, number>) => 
      (moods['Anxious'] || 0) + (moods['Stressed'] || 0) > 40
  },
  'Happy-Go-Lucky': {
    description: 'Pure sunshine in pet form! Spreads joy wherever they go.',
    traits: ['Optimistic', 'Joyful', 'Friendly', 'Easygoing'],
    icon: '☀️',
    color: 'yellow',
    conditions: (moods: Record<string, number>) => 
      (moods['Happy'] || 0) > 50 && (moods['Anxious'] || 0) < 10
  }
};

export const analyzePersonality = (analyses: Analysis[]): PersonalityProfile | null => {
  if (analyses.length < 5) return null;

  // Count mood frequencies
  const moodFrequency: Record<string, number> = {};
  analyses.forEach(analysis => {
    const mood = analysis.mood.primary;
    moodFrequency[mood] = (moodFrequency[mood] || 0) + 1;
  });

  // Convert to percentages
  const total = analyses.length;
  const moodPercentages: Record<string, number> = {};
  Object.keys(moodFrequency).forEach(mood => {
    moodPercentages[mood] = Math.round((moodFrequency[mood] / total) * 100);
  });

  // Find matching personality type
  let bestMatch = 'Happy-Go-Lucky'; // default
  for (const [type, config] of Object.entries(personalityTypes)) {
    if (config.conditions(moodPercentages)) {
      bestMatch = type;
      break;
    }
  }

  const selectedType = personalityTypes[bestMatch as keyof typeof personalityTypes];

  return {
    type: bestMatch,
    description: selectedType.description,
    traits: selectedType.traits,
    icon: selectedType.icon,
    color: selectedType.color,
    lastUpdated: new Date().toISOString(),
    analysisCount: analyses.length,
    moodFrequency: moodPercentages
  };
};

export const shouldUpdatePersonality = (currentCount: number, lastCount: number): boolean => {
  return currentCount >= 5 && (currentCount - lastCount) >= 5;
};