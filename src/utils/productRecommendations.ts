import { Product, PersonalityProfile } from '../types';

const productDatabase: Product[] = [
  // Toys for different moods
  {
    id: 'interactive-puzzle-toy',
    name: 'Interactive Puzzle Feeder',
    description: 'Mental stimulation toy that reduces anxiety and boredom',
    price: '$24.99',
    image: 'https://images.pexels.com/photos/7210754/pexels-photo-7210754.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'toy',
    targetMoods: ['Anxious', 'Bored', 'Curious'],
    targetPersonalities: ['Chill Introvert', 'Anxious Angel'],
    rating: 4.8,
    reviewCount: 1247
  },
  {
    id: 'rope-tug-toy',
    name: 'Heavy Duty Rope Tug Toy',
    description: 'Perfect for high-energy play sessions and bonding',
    price: '$16.99',
    image: 'https://images.pexels.com/photos/7210755/pexels-photo-7210755.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'toy',
    targetMoods: ['Excited', 'Playful', 'Happy'],
    targetPersonalities: ['Playful Diva', 'Adventure Seeker'],
    rating: 4.6,
    reviewCount: 892
  },
  {
    id: 'calming-chew-toy',
    name: 'Calming Lavender Chew Toy',
    description: 'Infused with natural lavender to promote relaxation',
    price: '$19.99',
    image: 'https://images.pexels.com/photos/7210756/pexels-photo-7210756.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'comfort',
    targetMoods: ['Anxious', 'Stressed'],
    targetPersonalities: ['Gentle Giant', 'Anxious Angel'],
    rating: 4.7,
    reviewCount: 634
  },
  
  // Food and treats
  {
    id: 'calming-treats',
    name: 'Natural Calming Treats',
    description: 'Chamomile and L-theanine treats for stress relief',
    price: '$22.99',
    image: 'https://images.pexels.com/photos/7210757/pexels-photo-7210757.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'food',
    targetMoods: ['Anxious', 'Stressed'],
    targetPersonalities: ['Anxious Angel', 'Gentle Giant'],
    rating: 4.5,
    reviewCount: 456
  },
  {
    id: 'training-treats',
    name: 'High-Value Training Treats',
    description: 'Irresistible treats perfect for training sessions',
    price: '$18.99',
    image: 'https://images.pexels.com/photos/7210758/pexels-photo-7210758.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'training',
    targetMoods: ['Curious', 'Playful'],
    targetPersonalities: ['Adventure Seeker', 'Playful Diva'],
    rating: 4.9,
    reviewCount: 1123
  },
  
  // Health and comfort
  {
    id: 'orthopedic-bed',
    name: 'Memory Foam Orthopedic Bed',
    description: 'Ultimate comfort for rest and relaxation',
    price: '$89.99',
    image: 'https://images.pexels.com/photos/7210759/pexels-photo-7210759.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'comfort',
    targetMoods: ['Content', 'Tired'],
    targetPersonalities: ['Chill Introvert', 'Gentle Giant'],
    rating: 4.8,
    reviewCount: 789
  },
  {
    id: 'anxiety-vest',
    name: 'Calming Anxiety Vest',
    description: 'Gentle pressure therapy for anxious pets',
    price: '$34.99',
    image: 'https://images.pexels.com/photos/7210760/pexels-photo-7210760.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'health',
    targetMoods: ['Anxious', 'Stressed'],
    targetPersonalities: ['Anxious Angel', 'Gentle Giant'],
    rating: 4.4,
    reviewCount: 567
  },
  
  // Activity and exercise
  {
    id: 'agility-kit',
    name: 'Backyard Agility Training Kit',
    description: 'Complete set for active dogs who love challenges',
    price: '$79.99',
    image: 'https://images.pexels.com/photos/7210761/pexels-photo-7210761.jpeg?auto=compress&cs=tinysrgb&w=300',
    affiliateUrl: '#',
    category: 'training',
    targetMoods: ['Excited', 'Playful', 'Energetic'],
    targetPersonalities: ['Adventure Seeker', 'Playful Diva'],
    rating: 4.7,
    reviewCount: 345
  }
];

export const getProductRecommendations = (
  mood: string, 
  personality?: PersonalityProfile,
  limit: number = 3
): Product[] => {
  let recommendations = productDatabase.filter(product => 
    product.targetMoods.includes(mood)
  );

  // If we have personality data, prioritize products that match
  if (personality) {
    const personalityMatches = productDatabase.filter(product =>
      product.targetPersonalities.includes(personality.type)
    );
    
    // Combine and deduplicate, prioritizing personality matches
    const combined = [...personalityMatches, ...recommendations];
    recommendations = combined.filter((product, index, self) =>
      index === self.findIndex(p => p.id === product.id)
    );
  }

  // Sort by rating and return limited results
  return recommendations
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const trackProductClick = (productId: string, source: 'mood_result' | 'marketplace'): void => {
  // In a real app, this would send analytics data
  console.log(`Product clicked: ${productId} from ${source}`);
  
  // Store click data for analytics
  const clickData = {
    productId,
    source,
    timestamp: new Date().toISOString()
  };
  
  const existingClicks = JSON.parse(localStorage.getItem('product_clicks') || '[]');
  existingClicks.push(clickData);
  localStorage.setItem('product_clicks', JSON.stringify(existingClicks));
};