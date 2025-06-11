import { Pet, Analysis } from '../types';

const PETS_KEY = 'pettranslate_pets';
const ANALYSES_KEY = 'pettranslate_analyses';

export const storage = {
  // Pet management
  getPets(): Pet[] {
    const pets = localStorage.getItem(PETS_KEY);
    return pets ? JSON.parse(pets) : [];
  },

  savePet(pet: Pet): void {
    const pets = this.getPets();
    const existingIndex = pets.findIndex(p => p.id === pet.id);
    
    if (existingIndex >= 0) {
      pets[existingIndex] = pet;
    } else {
      pets.push(pet);
    }
    
    localStorage.setItem(PETS_KEY, JSON.stringify(pets));
  },

  deletePet(petId: string): void {
    const pets = this.getPets().filter(p => p.id !== petId);
    localStorage.setItem(PETS_KEY, JSON.stringify(pets));
    
    // Also delete related analyses
    const analyses = this.getAnalyses().filter(a => a.petId !== petId);
    localStorage.setItem(ANALYSES_KEY, JSON.stringify(analyses));
  },

  // Analysis management
  getAnalyses(): Analysis[] {
    const analyses = localStorage.getItem(ANALYSES_KEY);
    return analyses ? JSON.parse(analyses) : [];
  },

  saveAnalysis(analysis: Analysis): void {
    const analyses = this.getAnalyses();
    analyses.push(analysis);
    localStorage.setItem(ANALYSES_KEY, JSON.stringify(analyses));
  },

  getAnalysesForPet(petId: string): Analysis[] {
    return this.getAnalyses().filter(a => a.petId === petId);
  },

  deleteAnalysis(analysisId: string): void {
    const analyses = this.getAnalyses().filter(a => a.id !== analysisId);
    localStorage.setItem(ANALYSES_KEY, JSON.stringify(analyses));
  }
};