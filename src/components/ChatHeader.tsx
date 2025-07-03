import React from 'react';
import { MapPin, DollarSign } from 'lucide-react';

export const ChatHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-2">
            <MapPin size={24} />
            <DollarSign size={24} />
          </div>
          <h1 className="text-2xl font-bold">Plan Trip with Your Budget</h1>
        </div>
        <p className="text-blue-100">
          Tell me about your dream destination, budget, and preferences. I'll help you create the perfect trip plan!
        </p>
      </div>
    </div>
  );
};