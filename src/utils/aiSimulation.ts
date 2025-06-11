import { MoodResult } from '../types';

const dogMoods = [
  {
    mood: { primary: 'Happy', confidence: 0.92 },
    description: "Your dog is feeling joyful and content! Their tail wagging and excited sounds indicate pure happiness.",
    suggestion: "Keep up the great energy! Maybe it's time for a fun game of fetch or their favorite treat.",
  },
  {
    mood: { primary: 'Excited', confidence: 0.87 },
    description: "Your pup is super excited! High-pitched barks and energetic movements show they're ready for action.",
    suggestion: "Channel that excitement into playtime! A walk, run, or interactive toy would be perfect right now.",
  },
  {
    mood: { primary: 'Anxious', confidence: 0.78 },
    description: "Your dog seems a bit worried or nervous. Low whines and tense posture suggest some anxiety.",
    suggestion: "Try to comfort them with gentle petting, their favorite blanket, or a calming activity like a puzzle toy.",
  },
  {
    mood: { primary: 'Curious', confidence: 0.85 },
    description: "Your dog is in investigative mode! Alert ears and questioning barks show they're exploring something new.",
    suggestion: "Encourage their curiosity with new experiences, training exercises, or exploration games.",
  },
  {
    mood: { primary: 'Hungry', confidence: 0.91 },
    description: "Those persistent barks and focused attention suggest your dog is asking for food!",
    suggestion: "Check if it's mealtime! A healthy snack or their regular meal should satisfy them.",
  },
  {
    mood: { primary: 'Playful', confidence: 0.89 },
    description: "Your dog is in full play mode! Bouncy movements and playful barks indicate they want to have fun.",
    suggestion: "Time for some interactive play! Tug-of-war, fetch, or a good game of chase would be ideal.",
  }
];

const catMoods = [
  {
    mood: { primary: 'Content', confidence: 0.88 },
    description: "Your cat is feeling peaceful and satisfied. Soft purring and relaxed posture show they're happy.",
    suggestion: "Perfect time for gentle petting or just letting them enjoy their comfortable spot.",
  },
  {
    mood: { primary: 'Attention-seeking', confidence: 0.82 },
    description: "Your cat wants your focus! Vocal meows and direct eye contact mean they're asking for interaction.",
    suggestion: "Give them some quality attention - petting, talking to them, or engaging with their favorite toy.",
  },
  {
    mood: { primary: 'Hungry', confidence: 0.90 },
    description: "Those insistent meows near their food area clearly indicate hunger!",
    suggestion: "Time to check their food bowl! A meal or healthy cat treat should satisfy their request.",
  },
  {
    mood: { primary: 'Territorial', confidence: 0.75 },
    description: "Your cat is showing protective behavior. Alert posture and specific vocalizations suggest territorial feelings.",
    suggestion: "Give them space and ensure their favorite areas remain accessible. Avoid sudden changes to their environment.",
  },
  {
    mood: { primary: 'Curious', confidence: 0.83 },
    description: "Your cat is in explorer mode! Focused attention and cautious movements show healthy curiosity.",
    suggestion: "Encourage safe exploration with new toys, climbing opportunities, or supervised investigation time.",
  },
  {
    mood: { primary: 'Stressed', confidence: 0.72 },
    description: "Your cat seems a bit overwhelmed. Tense posture and specific vocalizations indicate some stress.",
    suggestion: "Create a calm environment with their favorite hiding spots, soft music, or calming pheromones.",
  }
];

export const simulateAiAnalysis = async (file: File): Promise<MoodResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
  
  // Determine species based on filename or randomly
  const fileName = file.name.toLowerCase();
  let detectedSpecies: 'dog' | 'cat';
  
  if (fileName.includes('dog') || fileName.includes('bark') || fileName.includes('woof')) {
    detectedSpecies = 'dog';
  } else if (fileName.includes('cat') || fileName.includes('meow') || fileName.includes('purr')) {
    detectedSpecies = 'cat';
  } else {
    detectedSpecies = Math.random() > 0.5 ? 'dog' : 'cat';
  }
  
  // Select appropriate mood based on species
  const moods = detectedSpecies === 'dog' ? dogMoods : catMoods;
  const selectedMood = moods[Math.floor(Math.random() * moods.length)];
  
  // Add some randomness to confidence
  const speciesConfidence = 0.85 + Math.random() * 0.1;
  
  return {
    ...selectedMood,
    detectedSpecies,
    confidence: Math.round(speciesConfidence * 100) / 100,
  };
};