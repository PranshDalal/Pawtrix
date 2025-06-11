import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { Product } from '../types';
import { trackProductClick } from '../utils/productRecommendations';

interface ProductCardProps {
  product: Product;
  source: 'mood_result' | 'marketplace';
  petName?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, source, petName }) => {
  const handleClick = () => {
    trackProductClick(product.id, source);
    // In a real app, this would open the affiliate link
    window.open(product.affiliateUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 hover:scale-105">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-xs font-medium">{product.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-fredoka font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h4>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="font-fredoka font-bold text-lg text-gray-800">
            {product.price}
          </span>
          <span className="text-xs text-gray-500">
            {product.reviewCount} reviews
          </span>
        </div>
        
        {petName && (
          <p className="text-sm text-purple-600 font-fredoka font-medium mb-3">
            Perfect for {petName}! 💜
          </p>
        )}
        
        <button
          onClick={handleClick}
          className="w-full bg-gradient-to-r from-mint-400 to-coral-400 text-white font-fredoka font-semibold py-3 px-4 rounded-xl hover:from-mint-500 hover:to-coral-500 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>Shop Now</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;