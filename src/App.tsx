import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FileUpload from './components/FileUpload';
import AnalysisResult from './components/AnalysisResult';
import PetDiary from './components/PetDiary';
import PetManagement from './components/PetManagement';
import PetInsights from './components/PetInsights';
import PremiumFeatures from './components/PremiumFeatures';
import Marketplace from './components/Marketplace';
import UpsellModal from './components/UpsellModal';
import { simulateAiAnalysis } from './utils/aiSimulation';
import { storage } from './utils/storage';
import { subscriptionService } from './utils/subscription';
import { Pet, Analysis, MoodResult } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'upload' | 'diary' | 'pets' | 'insights' | 'premium' | 'marketplace'>('upload');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<MoodResult | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [upsellTrigger, setUpsellTrigger] = useState<any>(null);

  // Load data from storage on mount
  useEffect(() => {
    const storedPets = storage.getPets();
    const storedAnalyses = storage.getAnalyses();
    setPets(storedPets);
    setAnalyses(storedAnalyses);
    
    // Set first pet as current if available
    if (storedPets.length > 0 && !currentPet) {
      setCurrentPet(storedPets[0]);
    }
  }, []);

  const handleFileSelect = async (file: File) => {
    // Check if user can use analysis feature
    if (!subscriptionService.canUseFeature('analysis')) {
      const triggers = subscriptionService.checkUpsellTriggers(analyses.length, []);
      setUpsellTrigger(triggers[0]);
      setShowUpsellModal(true);
      return;
    }

    setCurrentFile(file);
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const result = await simulateAiAnalysis(file);
      setAnalysisResult(result);
      
      // Increment usage for free users
      subscriptionService.incrementUsage();
      
      // Check for upsell triggers after analysis
      const recentMoods = analyses.slice(-5).map(a => a.mood.primary);
      recentMoods.push(result.mood.primary);
      const triggers = subscriptionService.checkUpsellTriggers(analyses.length + 1, recentMoods);
      
      if (triggers.length > 0) {
        // Show upsell modal after a delay
        setTimeout(() => {
          setUpsellTrigger(triggers[0]);
          setShowUpsellModal(true);
        }, 3000);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveAnalysis = () => {
    if (!analysisResult || !currentFile || !currentPet) return;

    const analysis: Analysis = {
      id: Date.now().toString(),
      petId: currentPet.id,
      petName: currentPet.name,
      fileType: currentFile.type.startsWith('audio/') ? 'audio' : 'video',
      fileName: currentFile.name,
      detectedSpecies: analysisResult.detectedSpecies,
      confidence: analysisResult.confidence,
      mood: analysisResult.mood,
      description: analysisResult.description,
      suggestion: analysisResult.suggestion,
      timestamp: new Date().toISOString(),
    };

    storage.saveAnalysis(analysis);
    setAnalyses(storage.getAnalyses());
    
    // Show success feedback
    alert('Analysis saved to diary! 🎉');
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setCurrentFile(null);
  };

  const handleAddPet = (petData: Omit<Pet, 'id' | 'createdAt'>) => {
    const newPet: Pet = {
      ...petData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    storage.savePet(newPet);
    const updatedPets = storage.getPets();
    setPets(updatedPets);
    
    // Set as current pet if it's the first one
    if (updatedPets.length === 1) {
      setCurrentPet(newPet);
    }
  };

  const handleUpdatePet = (updatedPet: Pet) => {
    storage.savePet(updatedPet);
    setPets(storage.getPets());
    
    // Update current pet if it's the one being edited
    if (currentPet?.id === updatedPet.id) {
      setCurrentPet(updatedPet);
    }
  };

  const handleDeletePet = (petId: string) => {
    if (confirm('Are you sure you want to delete this pet and all their diary entries?')) {
      storage.deletePet(petId);
      setPets(storage.getPets());
      setAnalyses(storage.getAnalyses());
      
      // Clear current pet if it's the one being deleted
      if (currentPet?.id === petId) {
        const remainingPets = storage.getPets();
        setCurrentPet(remainingPets.length > 0 ? remainingPets[0] : null);
      }
    }
  };

  const handleSelectPet = (pet: Pet | null) => {
    setCurrentPet(pet);
  };

  const handleDeleteAnalysis = (analysisId: string) => {
    if (confirm('Are you sure you want to delete this diary entry?')) {
      storage.deleteAnalysis(analysisId);
      setAnalyses(storage.getAnalyses());
    }
  };

  const handleUpgrade = () => {
    subscriptionService.upgradeToPremium();
    setShowUpsellModal(false);
    alert('Welcome to Pawtrix+! 🎉 You now have access to all premium features.');
    // In a real app, this would integrate with Stripe
  };

  const subscription = subscriptionService.getSubscription();
  const isPremium = subscription.plan === 'pawtrix_plus';

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-white to-coral-50 font-fredoka">
      <Header currentPet={currentPet} />
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isPremium={isPremium}
      />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'upload' && (
          <div className="space-y-8">
            {!analysisResult ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="font-fredoka text-4xl font-bold text-gray-800 mb-4">
                    What is your pet feeling? 🤔
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
                    Upload a short audio or video clip of your pet, and our AI will analyze their sounds and behavior to understand their emotions!
                  </p>
                  
                  {!isPremium && (
                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 max-w-md mx-auto">
                      <p className="text-yellow-700 font-fredoka font-medium">
                        {subscriptionService.getRemainingUsage()} free analyses remaining this month
                      </p>
                    </div>
                  )}
                </div>
                
                <FileUpload 
                  onFileSelect={handleFileSelect} 
                  isAnalyzing={isAnalyzing}
                />
              </>
            ) : (
              <AnalysisResult
                result={analysisResult}
                currentPet={currentPet}
                onSave={handleSaveAnalysis}
                onNewAnalysis={handleNewAnalysis}
                isPremium={isPremium}
              />
            )}
          </div>
        )}
        
        {activeTab === 'diary' && (
          <PetDiary
            analyses={analyses}
            pets={pets}
            onDeleteAnalysis={handleDeleteAnalysis}
          />
        )}

        {activeTab === 'insights' && (
          <PetInsights
            pets={pets}
            analyses={analyses}
            currentPet={currentPet}
            onUpdatePet={handleUpdatePet}
            isPremium={isPremium}
          />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace currentPet={currentPet} />
        )}

        {activeTab === 'premium' && (
          <PremiumFeatures onUpgrade={handleUpgrade} />
        )}
        
        {activeTab === 'pets' && (
          <PetManagement
            pets={pets}
            currentPet={currentPet}
            onAddPet={handleAddPet}
            onUpdatePet={handleUpdatePet}
            onDeletePet={handleDeletePet}
            onSelectPet={handleSelectPet}
          />
        )}
      </main>

      {/* Upsell Modal */}
      <UpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        onUpgrade={handleUpgrade}
        trigger={upsellTrigger}
        remainingUsage={subscriptionService.getRemainingUsage()}
      />
    </div>
  );
}

export default App;