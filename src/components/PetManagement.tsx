import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Pet } from '../types';

interface PetManagementProps {
  pets: Pet[];
  currentPet: Pet | null;
  onAddPet: (pet: Omit<Pet, 'id' | 'createdAt'>) => void;
  onUpdatePet: (pet: Pet) => void;
  onDeletePet: (id: string) => void;
  onSelectPet: (pet: Pet | null) => void;
}

const PetManagement: React.FC<PetManagementProps> = ({
  pets,
  currentPet,
  onAddPet,
  onUpdatePet,
  onDeletePet,
  onSelectPet,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog' as 'dog' | 'cat',
    breed: '',
    age: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) return;

    const petData = {
      name: formData.name.trim(),
      species: formData.species,
      breed: formData.breed.trim() || undefined,
      age: formData.age ? parseInt(formData.age) : undefined,
    };

    if (editingId) {
      const existingPet = pets.find(p => p.id === editingId);
      if (existingPet) {
        onUpdatePet({ ...existingPet, ...petData });
      }
      setEditingId(null);
    } else {
      onAddPet(petData);
      setIsAdding(false);
    }

    setFormData({ name: '', species: 'dog', breed: '', age: '' });
  };

  const handleEdit = (pet: Pet) => {
    setFormData({
      name: pet.name,
      species: pet.species,
      breed: pet.breed || '',
      age: pet.age?.toString() || '',
    });
    setEditingId(pet.id);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', species: 'dog', breed: '', age: '' });
  };

  const startAdding = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({ name: '', species: 'dog', breed: '', age: '' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-2">
            My Pets
          </h2>
          <p className="text-gray-600">
            Manage your pet profiles to track their moods over time
          </p>
        </div>
        
        {!isAdding && !editingId && (
          <button
            onClick={startAdding}
            className="flex items-center space-x-2 bg-gradient-to-r from-mint-400 to-mint-500 text-white font-fredoka font-semibold py-3 px-6 rounded-xl hover:from-mint-500 hover:to-mint-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add Pet</span>
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h3 className="font-fredoka text-xl font-semibold text-gray-800 mb-6">
            {editingId ? 'Edit Pet' : 'Add New Pet'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-fredoka font-medium text-gray-700 mb-2">
                  Pet Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400 focus:border-transparent font-fredoka"
                  placeholder="Enter your pet's name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-fredoka font-medium text-gray-700 mb-2">
                  Species *
                </label>
                <select
                  value={formData.species}
                  onChange={(e) => setFormData({ ...formData, species: e.target.value as 'dog' | 'cat' })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400 focus:border-transparent font-fredoka"
                >
                  <option value="dog">🐕 Dog</option>
                  <option value="cat">🐱 Cat</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-fredoka font-medium text-gray-700 mb-2">
                  Breed (optional)
                </label>
                <input
                  type="text"
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400 focus:border-transparent font-fredoka"
                  placeholder="e.g., Golden Retriever, Persian"
                />
              </div>
              
              <div>
                <label className="block text-sm font-fredoka font-medium text-gray-700 mb-2">
                  Age (optional)
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mint-400 focus:border-transparent font-fredoka"
                  placeholder="Age in years"
                  min="0"
                  max="30"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-mint-500 text-white font-fredoka font-semibold py-3 px-6 rounded-xl hover:bg-mint-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Update Pet' : 'Add Pet'}</span>
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-200 text-gray-700 font-fredoka font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pet List */}
      {pets.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="font-fredoka text-2xl font-semibold text-gray-600 mb-2">
            No pets added yet
          </h3>
          <p className="text-gray-500 mb-8">
            Add your first pet to start tracking their moods and behaviors!
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-200 hover:shadow-xl ${
                currentPet?.id === pet.id
                  ? 'border-mint-400 bg-mint-50'
                  : 'border-gray-100 hover:border-mint-200'
              }`}
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">
                  {pet.species === 'dog' ? '🐕' : '🐱'}
                </div>
                <h3 className="font-fredoka text-xl font-bold text-gray-800">
                  {pet.name}
                </h3>
                {pet.breed && (
                  <p className="text-gray-600 text-sm font-medium">
                    {pet.breed}
                  </p>
                )}
                {pet.age && (
                  <p className="text-gray-500 text-sm">
                    {pet.age} year{pet.age !== 1 ? 's' : ''} old
                  </p>
                )}
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => onSelectPet(currentPet?.id === pet.id ? null : pet)}
                  className={`w-full py-2 px-4 rounded-xl font-fredoka font-medium transition-colors ${
                    currentPet?.id === pet.id
                      ? 'bg-mint-500 text-white'
                      : 'bg-mint-100 text-mint-700 hover:bg-mint-200'
                  }`}
                >
                  {currentPet?.id === pet.id ? 'Selected' : 'Select Pet'}
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(pet)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  
                  <button
                    onClick={() => onDeletePet(pet.id)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetManagement;