import React from 'react';
import { Heart, Lightbulb, TrendingUp, Save, ShoppingBag } from 'lucide-react';
import { MoodResult, Pet } from '../types';
import { getProductRecommendations } from '../utils/productRecommendations';
import ProductCard from './ProductCard';

interface AnalysisResultProps {
  result: MoodResult;
  currentPet?: Pet;
  onSave: () => void;
  onNewAnalysis: () => void;
  isPremium?: boolean;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ 
  result, 
  currentPet, 
  onSave, 
  onNewAnalysis,
  isPremium = false
}) => {
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

  const moodColor = getMoodColor(result.mood.primary);
  const speciesEmoji = result.detectedSpecies === 'dog' ? '🐕' : '🐱';
  
  // Get product recommendations
  const recommendations = getProductRecommendations(
    result.mood.primary, 
    currentPet?.personality, 
    3
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Result Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className="text-6xl animate-pulse-slow">{speciesEmoji}</div>
        </div>

        {/* Species Detection */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 mb-4">
            <span className="text-2xl">{speciesEmoji}</span>
            <span className="font-fredoka font-medium text-gray-700">
              {result.detectedSpecies === 'dog' ? 'Dog' : 'Cat'} detected
            </span>
            <span className="text-sm text-gray-500">
              ({Math.round(result.confidence * 100)}% confidence)
            </span>
          </div>
        </div>

        {/* Mood Result */}
        <div className="text-center mb-8">
          <div className={`w-24 h-24 bg-${moodColor}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Heart className={`w-12 h-12 text-${moodColor}-500 animate-pulse`} />
          </div>
          
          <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-2">
            {result.mood.primary}
          </h2>
          
          {result.mood.secondary && (
            <p className="text-lg text-gray-600 font-medium">
              with hints of {result.mood.secondary}
            </p>
          )}
          
          <div className="mt-4">
            <div className={`inline-block bg-${moodColor}-100 rounded-full px-4 py-2`}>
              <span className={`text-${moodColor}-700 font-fredoka font-medium`}>
                {Math.round(result.mood.confidence * 100)}% confidence
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Suggestion Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-mint-50 to-coral-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-mint-100 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-mint-600" />
            </div>
            <div>
              <h3 className="font-fredoka font-semibold text-lg text-gray-800 mb-2">
                What we detected
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {result.description}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-lavender-50 to-mint-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-lavender-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-lavender-600" />
            </div>
            <div>
              <h3 className="font-fredoka font-semibold text-lg text-gray-800 mb-2">
                What you can do
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {result.suggestion}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <ShoppingBag className="w-6 h-6 text-coral-500" />
            <h3 className="font-fredoka text-xl font-bold text-gray-800">
              Perfect Products for {currentPet?.name || 'Your Pet'}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                source="mood_result"
                petName={currentPet?.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onSave}
          disabled={!currentPet}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-fredoka font-semibold transition-all duration-200 ${
            currentPet
              ? 'bg-mint-500 text-white hover:bg-mint-600 transform hover:scale-105 shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Save className="w-5 h-5" />
          <span>Save to Diary</span>
        </button>
        
        <button
          onClick={onNewAnalysis}
          className="flex-1 bg-white text-coral-600 border-2 border-coral-200 font-fredoka font-semibold py-4 px-6 rounded-xl hover:bg-coral-50 hover:border-coral-300 transform hover:scale-105 transition-all duration-200"
        >
          Analyze Another
        </button>
      </div>

      {!currentPet && (
        <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <p className="text-yellow-700 font-fredoka">
            💡 Add a pet profile to save this analysis to your diary!
          </p>
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;