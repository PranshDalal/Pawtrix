import React from 'react';
import { Heart, PawPrint, ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentPet?: { name: string; species: 'dog' | 'cat' } | null;
}

const Header: React.FC<HeaderProps> = ({ currentPet }) => {
  return (
    <header className="bg-gradient-to-r from-mint-400 via-coral-300 to-lavender-400 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <PawPrint className="w-8 h-8 text-white animate-bounce-slow" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-coral-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-coral-700">⚡</span>
              </div>
            </div>
            
            <div>
              <h1 className="font-fredoka text-3xl font-bold tracking-wide">
                Pawtrix
              </h1>
              <p className="text-white/80 text-sm font-medium">
                Decode your pet's emotions ⚡
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentPet && (
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <span className="text-2xl">
                  {currentPet.species === 'dog' ? '🐕' : '🐱'}
                </span>
                <span className="font-fredoka font-medium">
                  {currentPet.name}
                </span>
              </div>
            )}
            
            {/* Bolt Badge */}
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 rounded-full px-3 py-2 flex items-center space-x-2 group"
              title="Built with Bolt"
            >
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gray-800">⚡</span>
              </div>
              <span className="font-fredoka font-medium text-sm group-hover:text-white/90">
                Built with Bolt
              </span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;