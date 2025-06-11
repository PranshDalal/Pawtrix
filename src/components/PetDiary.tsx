import React from 'react';
import { Calendar, Trash2, PawPrint, TrendingUp } from 'lucide-react';
import { Analysis, Pet } from '../types';

interface PetDiaryProps {
  analyses: Analysis[];
  pets: Pet[];
  onDeleteAnalysis: (id: string) => void;
}

const PetDiary: React.FC<PetDiaryProps> = ({ analyses, pets, onDeleteAnalysis }) => {
  const sortedAnalyses = analyses.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getPetById = (id: string) => pets.find(p => p.id === id);

  const getMoodColor = (mood: string) => {
    const moodColors: Record<string, string> = {
      'Happy': 'mint',
      'Excited': 'coral',
      'Playful': 'lavender',
      'Content': 'mint',
      'Curious': 'lavender',
      'Anxious': 'yellow',
      'Stressed': 'red',
      'Hungry': 'orange',
      'Territorial': 'purple',
      'Attention-seeking': 'coral',
    };
    return moodColors[mood] || 'mint';
  };

  if (analyses.length === 0) {
    return (
      <div className="text-center py-16">
        <PawPrint className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="font-fredoka text-2xl font-semibold text-gray-600 mb-2">
          No diary entries yet
        </h3>
        <p className="text-gray-500 mb-8">
          Start analyzing your pet's sounds to build their mood diary!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-2">
          Pet Diary
        </h2>
        <p className="text-gray-600">
          Track your pet's moods and behaviors over time
        </p>
      </div>

      <div className="space-y-6">
        {sortedAnalyses.map((analysis) => {
          const pet = getPetById(analysis.petId);
          const moodColor = getMoodColor(analysis.mood.primary);
          
          return (
            <div
              key={analysis.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-${moodColor}-100 rounded-full flex items-center justify-center`}>
                    <span className="text-xl">
                      {analysis.detectedSpecies === 'dog' ? '🐕' : '🐱'}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-fredoka font-semibold text-lg text-gray-800">
                      {analysis.petName}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(analysis.timestamp).toLocaleDateString()}</span>
                      </div>
                      <span>•</span>
                      <span>{analysis.fileType} analysis</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => onDeleteAnalysis(analysis.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className={`w-5 h-5 text-${moodColor}-500`} />
                    <h4 className="font-fredoka font-semibold text-gray-800">
                      Detected Mood
                    </h4>
                  </div>
                  
                  <div className={`inline-block bg-${moodColor}-100 rounded-full px-4 py-2 mb-3`}>
                    <span className={`text-${moodColor}-700 font-fredoka font-medium`}>
                      {analysis.mood.primary}
                    </span>
                    {analysis.mood.secondary && (
                      <span className="text-gray-600 ml-2">
                        + {analysis.mood.secondary}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {analysis.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-fredoka font-semibold text-gray-800 mb-3">
                    Suggested Action
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {analysis.suggestion}
                    </p>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    Confidence: {Math.round(analysis.mood.confidence * 100)}%
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PetDiary;