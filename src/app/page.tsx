"use client"
import React, { useState, useEffect, use } from 'react';
import { Car, MapPin, Users, Zap, Star, ArrowRight } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';




const LandingPage =  () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 const route = useRouter()
 const {data:session}=useSession();
//  console.log(session)

  useEffect(() => {
    setIsVisible(true);
    if(session){
      route.push('/dashboard')
    }
  }, [session]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    signIn('google')
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleGetStarted = () => {
    handleGoogleLogin();
  };

  return (
    <div className="min-h-screen h-full relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce delay-1000">
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Car className="w-10 h-10 text-white" />
        </div>
      </div>
      
      <div className="absolute top-40 right-20 animate-pulse delay-2000">
        <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <MapPin className="w-8 h-8 text-yellow-300" />
        </div>
      </div>
      
      <div className="absolute bottom-40 left-20 animate-bounce delay-500">
        <div className="w-24 h-24 bg-green-400/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Users className="w-12 h-12 text-green-300" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className={`text-center max-w-4xl mx-auto transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Logo */}
          <div className="mb-8 inline-block">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
              <Car className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Auto<span className="text-yellow-300">Fare</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Calculate fair auto-rickshaw prices instantly. Crowd-sourced data from local communities 
            for transparent and reliable fare estimation.
          </p>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transform transition-all duration-700 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Zap className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Instant Calculation</h3>
              <p className="text-white/70">Get fare estimates in seconds with real-time data</p>
            </div>
            
            <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transform transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Users className="w-12 h-12 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Community Driven</h3>
              <p className="text-white/70">Powered by contributions from local travelers</p>
            </div>
            
            <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transform transition-all duration-700 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Star className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">AI Trip Planner</h3>
              <p className="text-white/70">Smart route optimization and cost planning</p>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-700 delay-900 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <button
              onClick={handleGetStarted}
              disabled={isLoading}
              className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-xl disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  Connecting...
                </>
              ) : (
                <>
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-white/30 disabled:opacity-70"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
          
          {/* Stats */}
          {/* <div className={`mt-16 grid grid-cols-3 gap-8 transform transition-all duration-700 delay-1100 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/70">Routes Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/70">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-white/70">Accuracy Rate</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;