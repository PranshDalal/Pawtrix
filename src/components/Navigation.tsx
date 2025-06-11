import React from 'react';
import { Upload, BookOpen, Settings, Plus, BarChart3, User, Crown, ShoppingBag } from 'lucide-react';

interface NavigationProps {
  activeTab: 'upload' | 'diary' | 'pets' | 'insights' | 'premium' | 'marketplace';
  onTabChange: (tab: 'upload' | 'diary' | 'pets' | 'insights' | 'premium' | 'marketplace') => void;
  isPremium?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, isPremium = false }) => {
  const tabs = [
    { id: 'upload' as const, label: 'Analyze', icon: Upload, color: 'mint' },
    { id: 'diary' as const, label: 'Diary', icon: BookOpen, color: 'coral' },
    { id: 'insights' as const, label: 'Insights', icon: BarChart3, color: 'lavender' },
    { id: 'marketplace' as const, label: 'Shop', icon: ShoppingBag, color: 'yellow' },
    { id: 'premium' as const, label: isPremium ? 'Pawtrix+' : 'Upgrade', icon: Crown, color: 'purple' },
    { id: 'pets' as const, label: 'My Pets', icon: User, color: 'blue' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isPremiumTab = tab.id === 'premium';
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-4 py-4 font-fredoka font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                  isActive
                    ? `border-${tab.color}-400 text-${tab.color}-600 bg-${tab.color}-50`
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                } ${isPremiumTab && isPremium ? 'bg-gradient-to-r from-purple-50 to-pink-50' : ''}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? `text-${tab.color}-500` : ''} ${isPremiumTab && isPremium ? 'text-purple-500' : ''}`} />
                <span className={isPremiumTab && isPremium ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent' : ''}>
                  {tab.label}
                </span>
                {isPremiumTab && isPremium && (
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;