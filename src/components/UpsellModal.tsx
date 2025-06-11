import React from 'react';
import { X, Crown, Check, Sparkles, TrendingUp, Download, Heart } from 'lucide-react';
import { UpsellTrigger } from '../types';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  trigger?: UpsellTrigger;
  remainingUsage: number;
}

const UpsellModal: React.FC<UpsellModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpgrade, 
  trigger,
  remainingUsage 
}) => {
  if (!isOpen) return null;

  const getModalContent = () => {
    switch (trigger?.type) {
      case 'usage_limit':
        return {
          title: "You're almost out of free analyses! 🎯",
          subtitle: `Only ${remainingUsage} analysis left this month`,
          highlight: "Don't let your pet's feelings go unheard"
        };
      case 'mood_pattern':
        return {
          title: "We noticed your pet seems anxious lately 💙",
          subtitle: "PetWell+ includes expert tips and advanced insights",
          highlight: "Help your furry friend feel better"
        };
      case 'personality_unlock':
        return {
          title: "Your pet's personality is ready! ✨",
          subtitle: "Unlock detailed personality insights with PetWell+",
          highlight: "Discover what makes your pet unique"
        };
      default:
        return {
          title: "Unlock your pet's full potential! 🌟",
          subtitle: "Get unlimited analyses and premium features",
          highlight: "Everything you need for a happy, healthy pet"
        };
    }
  };

  const content = getModalContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-purple-500" />
          </div>
          
          <h2 className="font-fredoka text-2xl font-bold text-gray-800 mb-2">
            {content.title}
          </h2>
          <p className="text-gray-600 mb-2">
            {content.subtitle}
          </p>
          <p className="text-purple-600 font-fredoka font-semibold">
            {content.highlight}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-mint-100 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-mint-600" />
            </div>
            <span className="text-gray-700">Unlimited mood analyses</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-coral-100 rounded-full flex items-center justify-center">
              <Download className="w-4 h-4 text-coral-600" />
            </div>
            <span className="text-gray-700">Downloadable personality reports</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-lavender-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-lavender-600" />
            </div>
            <span className="text-gray-700">Advanced mood trend analytics</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-pink-600" />
            </div>
            <span className="text-gray-700">Custom enrichment activity plans</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-3xl font-fredoka font-bold text-gray-800">$9.99</span>
              <span className="text-gray-600">/month</span>
            </div>
            <p className="text-sm text-gray-600">
              Cancel anytime • 7-day free trial
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-fredoka font-bold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Start Free Trial</span>
            </div>
          </button>
          
          <button
            onClick={onClose}
            className="w-full text-gray-600 font-fredoka font-medium py-2 hover:text-gray-800 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpsellModal;