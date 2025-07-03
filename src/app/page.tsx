"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Clock, Shield, Car } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 relative overflow-hidden">
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20">
      </div> */}
      
      {/* Floating background shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-56 h-56 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Car className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Know Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Fair Rickshaw Price
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get instant, transparent pricing for your auto rickshaw rides. No more haggling, 
              no more surprises. Just fair prices based on distance and local rates.
            </p>
          </div>

          {/* Feature highlights */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center space-x-2 text-blue-200">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-medium">Location Based</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">Real-time Pricing</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">100% Transparent</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Link
            href={"/main"}
            >
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-900 bg-white rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-30 transition-opacity duration-150"></div>
            </button>
            </Link>
            
            
           
          </div>

          {/* Trust indicators */}
          <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-blue-300 mb-4">Trusted by thousands of daily commuters</p>
              <div className="flex justify-center space-x-8 text-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">??</div>
                  <div className="text-xs">Happy Riders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">??</div>
                  <div className="text-xs">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99%</div>
                  <div className="text-xs">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-20 sm:h-32">
          <path 
            fill="rgba(255,255,255,0.1)" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

