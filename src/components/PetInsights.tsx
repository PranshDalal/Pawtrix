import React, { useState, useEffect } from 'react';
import { Download, Sparkles, Calendar, TrendingUp, Crown, Lock } from 'lucide-react';
import { Pet, Analysis } from '../types';
import { analyzePersonality, shouldUpdatePersonality } from '../utils/personalityAnalyzer';
import { generateMoodCalendar, generateMoodTrends, getMoodOfTheWeek } from '../utils/moodCalendar';
import { generatePetReport } from '../utils/pdfExport';
import { subscriptionService } from '../utils/subscription';
import { storage } from '../utils/storage';
import PersonalityCard from './PersonalityCard';
import MoodCalendar from './MoodCalendar';
import MoodTrends from './MoodTrends';

interface PetInsightsProps {
  pets: Pet[];
  analyses: Analysis[];
  currentPet: Pet | null;
  onUpdatePet: (pet: Pet) => void;
  isPremium?: boolean;
}

const PetInsights: React.FC<PetInsightsProps> = ({ 
  pets, 
  analyses, 
  currentPet, 
  onUpdatePet,
  isPremium = false
}) => {
  const [selectedPetId, setSelectedPetId] = useState<string>(currentPet?.id || '');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (currentPet) {
      setSelectedPetId(currentPet.id);
    }
  }, [currentPet]);

  const selectedPet = pets.find(p => p.id === selectedPetId) || currentPet;
  const petAnalyses = selectedPet ? analyses.filter(a => a.petId === selectedPet.id) : [];

  // Update personality if needed
  useEffect(() => {
    if (selectedPet && petAnalyses.length >= 5) {
      const currentPersonality = selectedPet.personality;
      const shouldUpdate = !currentPersonality || 
        shouldUpdatePersonality(petAnalyses.length, currentPersonality.analysisCount);

      if (shouldUpdate) {
        const newPersonality = analyzePersonality(petAnalyses);
        if (newPersonality) {
          const updatedPet = { ...selectedPet, personality: newPersonality };
          onUpdatePet(updatedPet);
        }
      }
    }
  }, [selectedPet, petAnalyses, onUpdatePet]);

  const calendarData = selectedPet ? generateMoodCalendar(petAnalyses, currentYear, currentMonth) : [];
  const trendData = selectedPet ? generateMoodTrends(petAnalyses) : [];
  const moodOfTheWeek = selectedPet ? getMoodOfTheWeek(petAnalyses) : { mood: 'No data', count: 0, color: '#6b7280' };

  const handleDownloadReport = () => {
    if (!isPremium) {
      alert('PDF reports are a premium feature. Upgrade to PetWell+ to download detailed reports!');
      return;
    }
    
    if (selectedPet) {
      generatePetReport(selectedPet, petAnalyses);
    }
  };

  if (pets.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="font-fredoka text-2xl font-semibold text-gray-600 mb-2">
          No pets to analyze
        </h3>
        <p className="text-gray-500">
          Add a pet and start analyzing their moods to see insights!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-2">
            Pet Insights
          </h2>
          <p className="text-gray-600">
            Discover your pet's personality and mood patterns
          </p>
        </div>

        {selectedPet && petAnalyses.length > 0 && (
          <button
            onClick={handleDownloadReport}
            className={`flex items-center space-x-2 font-fredoka font-semibold py-3 px-6 rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg ${
              isPremium
                ? 'bg-gradient-to-r from-lavender-400 to-lavender-500 text-white hover:from-lavender-500 hover:to-lavender-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isPremium}
          >
            {isPremium ? <Download className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            <span>Download Report</span>
            {!isPremium && (
              <Crown className="w-4 h-4 text-yellow-500" />
            )}
          </button>
        )}
      </div>

      {/* Premium Upsell Banner */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="font-fredoka text-lg font-bold text-gray-800">
                  Unlock Premium Insights
                </h3>
                <p className="text-gray-600">
                  Get detailed personality reports, advanced trends, and mood-based music
                </p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-fredoka font-semibold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Pet Selector */}
      {pets.length > 1 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="font-fredoka text-lg font-semibold text-gray-800 mb-4">
            Select Pet to Analyze
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pets.map(pet => (
              <button
                key={pet.id}
                onClick={() => setSelectedPetId(pet.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedPetId === pet.id
                    ? 'border-mint-400 bg-mint-50'
                    : 'border-gray-200 hover:border-mint-200 hover:bg-mint-25'
                }`}
              >
                <div className="text-3xl mb-2">
                  {pet.species === 'dog' ? '🐕' : '🐱'}
                </div>
                <div className="font-fredoka font-medium text-gray-800">
                  {pet.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedPet ? (
        <>
          {petAnalyses.length < 5 ? (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-fredoka text-2xl font-semibold text-gray-800 mb-2">
                More Data Needed
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedPet.name} needs at least 5 mood analyses to generate personality insights.
              </p>
              <p className="text-gray-500">
                Current analyses: {petAnalyses.length}/5
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-4 max-w-xs mx-auto">
                <div 
                  className="bg-gradient-to-r from-mint-400 to-coral-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(petAnalyses.length / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Personality Profile */}
              {selectedPet.personality && (
                <div className="lg:col-span-2">
                  <PersonalityCard 
                    personality={selectedPet.personality} 
                    petName={selectedPet.name}
                  />
                </div>
              )}

              {/* Mood Calendar */}
              <div className={!isPremium ? 'relative' : ''}>
                {!isPremium && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 rounded-2xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="font-fredoka font-semibold text-gray-600">Premium Feature</p>
                    </div>
                  </div>
                )}
                <MoodCalendar
                  calendarData={calendarData}
                  currentMonth={currentMonth}
                  currentYear={currentYear}
                  onMonthChange={(month, year) => {
                    setCurrentMonth(month);
                    setCurrentYear(year);
                  }}
                />
              </div>

              {/* Mood Trends */}
              <div className={!isPremium ? 'relative' : ''}>
                {!isPremium && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 rounded-2xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="font-fredoka font-semibold text-gray-600">Premium Feature</p>
                    </div>
                  </div>
                )}
                <MoodTrends
                  trends={trendData}
                  moodOfTheWeek={moodOfTheWeek}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="font-fredoka text-2xl font-semibold text-gray-600 mb-2">
            Select a pet to view insights
          </h3>
          <p className="text-gray-500">
            Choose a pet from the selector above to see their personality and mood patterns
          </p>
        </div>
      )}
    </div>
  );
};

export default PetInsights;