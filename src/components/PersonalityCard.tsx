import React from 'react';
import { Crown, Heart, Sparkles } from 'lucide-react';
import { PersonalityProfile } from '../types';

interface PersonalityCardProps {
  personality: PersonalityProfile;
  petName: string;
}

const PersonalityCard: React.FC<PersonalityCardProps> = ({ personality, petName }) => {
  return (
    <div className={`bg-gradient-to-br from-${personality.color}-50 to-${personality.color}-100 rounded-2xl p-6 border border-${personality.color}-200 relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <div className="text-4xl">{personality.icon}</div>
      </div>

      <div className="relative">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-12 h-12 bg-${personality.color}-200 rounded-full flex items-center justify-center`}>
            <span className="text-2xl">{personality.icon}</span>
          </div>
          <div>
            <h3 className="font-fredoka text-xl font-bold text-gray-800">
              {personality.type}
            </h3>
            <p className="text-sm text-gray-600">
              {petName}'s personality type
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">
          {personality.description}
        </p>

        <div className="mb-4">
          <h4 className="font-fredoka font-semibold text-gray-800 mb-2 flex items-center space-x-1">
            <Sparkles className="w-4 h-4" />
            <span>Key Traits</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {personality.traits.map((trait, index) => (
              <span
                key={index}
                className={`px-3 py-1 bg-${personality.color}-200 text-${personality.color}-800 rounded-full text-sm font-fredoka font-medium`}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-500 flex items-center justify-between">
          <span>Based on {personality.analysisCount} analyses</span>
          <span>Updated {new Date(personality.lastUpdated).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalityCard;