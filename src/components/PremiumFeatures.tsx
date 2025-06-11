import React from 'react';
import { Crown, Download, TrendingUp, Heart, Sparkles, Check } from 'lucide-react';
import { subscriptionService } from '../utils/subscription';

interface PremiumFeaturesProps {
  onUpgrade: () => void;
}

const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({ onUpgrade }) => {
  const subscription = subscriptionService.getSubscription();
  const isPremium = subscription.plan === 'pawtrix_plus';

  if (isPremium) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-3xl p-8 border border-purple-200 mb-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-purple-500" />
            </div>
            
            <h2 className="font-fredoka text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Welcome to Pawtrix+! ✨
            </h2>
            
            <p className="text-gray-700 text-lg mb-6">
              You have access to all premium features to help your pet live their best life!
            </p>
            
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <Check className="w-5 h-5" />
              <span className="font-fredoka font-semibold">Active Subscription</span>
            </div>
          </div>
        </div>

        {/* Premium Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-mint-100 rounded-full flex items-center justify-center">
                <Download className="w-6 h-6 text-mint-600" />
              </div>
              <h3 className="font-fredoka text-xl font-bold text-gray-800">
                Personality Reports
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Download detailed PDF reports of your pet's personality analysis and mood history.
            </p>
            <div className="bg-mint-50 rounded-lg p-3">
              <p className="text-mint-700 text-sm font-fredoka font-medium">
                ✓ Available in Insights tab
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-lavender-600" />
              </div>
              <h3 className="font-fredoka text-xl font-bold text-gray-800">
                Advanced Analytics
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Track mood trends, view detailed calendars, and get weekly mood alerts.
            </p>
            <div className="bg-lavender-50 rounded-lg p-3">
              <p className="text-lavender-700 text-sm font-fredoka font-medium">
                ✓ Full access to Insights
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-coral-600" />
              </div>
              <h3 className="font-fredoka text-xl font-bold text-gray-800">
                Custom Activity Plans
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Get personalized enrichment activities based on your pet's personality and mood patterns.
            </p>
            <div className="bg-coral-50 rounded-lg p-3">
              <p className="text-coral-700 text-sm font-fredoka font-medium">
                ✓ Coming soon!
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-fredoka text-xl font-bold text-gray-800">
                Priority Support
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Get faster response times and dedicated support for all your pet care questions.
            </p>
            <div className="bg-yellow-50 rounded-lg p-3">
              <p className="text-yellow-700 text-sm font-fredoka font-medium">
                ✓ Available now
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-3xl p-8 border border-purple-200 text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Crown className="w-10 h-10 text-purple-500" />
        </div>
        
        <h2 className="font-fredoka text-4xl font-bold text-gray-800 mb-4">
          Upgrade to Pawtrix+
        </h2>
        
        <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
          Unlock the full potential of understanding your pet's emotions with premium features designed by pet behavior experts.
        </p>
        
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="text-center">
            <div className="text-3xl font-fredoka font-bold text-gray-800">$9.99</div>
            <div className="text-gray-600">per month</div>
          </div>
          <div className="text-gray-400">•</div>
          <div className="text-center">
            <div className="text-lg font-fredoka font-semibold text-green-600">7 days free</div>
            <div className="text-gray-600">trial</div>
          </div>
        </div>
        
        <button
          onClick={onUpgrade}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-fredoka font-bold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <span>Start Free Trial</span>
          </div>
        </button>
      </div>

      {/* Features Comparison */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="font-fredoka text-xl font-bold text-gray-800">
            What's included in Pawtrix+
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Features */}
            <div>
              <h4 className="font-fredoka text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-bold text-gray-600">F</span>
                </div>
                Free Plan
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">5 analyses per month</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Basic mood detection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Pet diary</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Product recommendations</span>
                </div>
              </div>
            </div>

            {/* Premium Features */}
            <div>
              <h4 className="font-fredoka text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2">
                  <Crown className="w-3 h-3 text-white" />
                </div>
                Pawtrix+ Plan
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700 font-medium">Unlimited analyses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700 font-medium">Personality analysis & reports</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700 font-medium">Advanced mood trends</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700 font-medium">Weekly mood alerts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700 font-medium">Custom activity plans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700 font-medium">Priority support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="mt-8 bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-fredoka text-lg font-semibold text-gray-800">
              Your Current Usage
            </h3>
            <p className="text-gray-600">
              You've used {subscription.usageCount} out of 5 free analyses this month
            </p>
          </div>
        </div>
        
        <div className="w-full bg-yellow-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(subscription.usageCount / 5) * 100}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-yellow-700">
          {subscription.usageCount >= 4 ? 
            "You're almost out of free analyses! Upgrade to continue understanding your pet." :
            `${5 - subscription.usageCount} analyses remaining until ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`
          }
        </p>
      </div>
    </div>
  );
};

export default PremiumFeatures;