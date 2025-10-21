"use client"

import React, { useState } from 'react';
import { ArrowLeft, Zap, MapPin, Clock, DollarSign, Route, Plus, Trash2, Brain, Wallet, Navigation } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';




interface Stop {
  id: string;
  location: string;
}

interface TripPlan {
  totalFare: number;
  totalTime: number;
  budgetAnalysis: {
    withinBudget: boolean;
    savings: number;
    alternatives: string[];
  };
  geminiInsights: string[];
  routes: Array<{
    from: string;
    to: string;
    fare: number;
    time: number;
    distance: string;
    alternatives: string[];
  }>;
}

const TripPlanner= () => {
  const [startLocation, setStartLocation] = useState('');
  const [stops, setStops] = useState<Stop[]>([]);
  const [endLocation, setEndLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [preferences, setPreferences] = useState({
    priority: 'balanced', // 'cost', 'time', 'balanced'
    avoidTraffic: true,
    preferShared: false
  });
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [isPlanning, setIsPlanning] = useState(false);

  const addStop = () => {
    const newStop: Stop = {
      id: Date.now().toString(),
      location: ''
    };
    setStops([...stops, newStop]);
  };

  const removeStop = (id: string) => {
    setStops(stops.filter(stop => stop.id !== id));
  };

  const updateStop = (id: string, location: string) => {
    setStops(stops.map(stop => 
      stop.id === id ? { ...stop, location } : stop
    ));
  };

 const planTrip = async () => {
  if (!startLocation || !endLocation || !budget) return;

  setIsPlanning(true);

  try {
    const response = await axios.post("/api/gemini-api-response", {
      startLocation,
      stops,
      endLocation,
      budget,
      preferences,
    });
    console.log(response)


    if (response.data.error && response.data.raw) {
      // Gemini gave invalid JSON → show raw for debugging
      // console.warn("Gemini raw response (unparsed):", response.data.raw);
    } else {
      // Valid plan
      // console.log("Parsed Trip Plan:", response.data);
      setTripPlan(response.data);
    }
  } catch (error: any) {
    console.error(
      "Trip planning failed:",
      error.response?.data || error.message
    );
  } finally {
    setIsPlanning(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href='/dashboard'>
            
            <button
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Trip Planner
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-row-2 gap-8 w-full">
          
          {/* Trip Planning Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Route className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Plan Your Trip</h2>
                <p className="text-gray-600">AI-optimized routes with cost breakdown</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Start Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  <input
                    type="text"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    placeholder="Where are you starting from?"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-500 text-bold"
                  />
                </div>
              </div>

              {/* Stops */}
              {stops.map((stop, index) => (
                <div key={stop.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stop {index + 1}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                    <input
                      type="text"
                      value={stop.location}
                      onChange={(e) => updateStop(stop.id, e.target.value)}
                      placeholder="Add a stop"
                      className="w-full pl-12 pr-12 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-500 text-bold"
                    />
                    <button
                      onClick={() => removeStop(stop.id)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Stop Button */}
              <button
                onClick={addStop}
                className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Stop
              </button>

              {/* End Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                  <input
                    type="text"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    placeholder="Where do you want to go?"
                    className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-500 text-bold"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹)</label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Enter your budget"
                    className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-500 text-bold"
                  />
                </div>
              </div>

              {/* Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Trip Preferences</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Priority</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'cost', label: 'Cost', icon: '💰' },
                        { value: 'time', label: 'Time', icon: '⚡' },
                        { value: 'balanced', label: 'Balanced', icon: '⚖️' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setPreferences({...preferences, priority: option.value})}
                          className={`p-2 rounded-lg text-sm font-medium transition-all ${
                            preferences.priority === option.value
                              ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                              : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                          }`}
                        >
                          <span className="block text-lg mb-1">{option.icon}</span>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.avoidTraffic}
                        onChange={(e) => setPreferences({...preferences, avoidTraffic: e.target.checked})}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Avoid traffic</span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.preferShared}
                        onChange={(e) => setPreferences({...preferences, preferShared: e.target.checked})}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Prefer shared</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Plan Trip Button */}
              <button
                onClick={planTrip}
                disabled={!startLocation || !endLocation || !budget || isPlanning}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPlanning ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Gemini AI is optimizing your trip...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Plan with Gemini AI
                  </>
                )}
              </button>
            </div>

            {/* Gemini AI Features */}
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-800">Gemini AI Features</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">Smart Route Planning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Budget Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Real-time Insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Preference Learning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Plan Results */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Trip Plan</h2>
            
            {tripPlan ? (
              <div className="space-y-6">
                {/* Summary */}
                <div className={`p-6 rounded-xl border-2 ${
                  tripPlan.budgetAnalysis.withinBudget 
                    ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200' 
                    : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
                }`}>
                  <div className="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-gray-600">Total Fare</span>
                      </div>
                      <div className={`text-3xl font-bold ${
                        tripPlan.budgetAnalysis.withinBudget ? 'text-green-600' : 'text-red-600'
                      }`}>₹{tripPlan.totalFare}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-gray-600">Total Time</span>
                      </div>
                      <div className="text-3xl font-bold text-blue-600">
                        {Math.floor(tripPlan.totalTime / 60)}h {tripPlan.totalTime % 60}m
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Wallet className="w-5 h-5 text-purple-600" />
                        <span className="text-sm text-gray-600">Budget</span>
                      </div>
                      <div className="text-3xl font-bold text-purple-600">₹{budget}</div>
                    </div>
                  </div>
                  
                  {/* Budget Status */}
                  <div className={`p-3 rounded-lg ${
                    tripPlan.budgetAnalysis.withinBudget 
                      ? 'bg-green-100 border border-green-200' 
                      : 'bg-red-100 border border-red-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Wallet className={`w-4 h-4 ${
                        tripPlan.budgetAnalysis.withinBudget ? 'text-green-600' : 'text-red-600'
                      }`} />
                      <span className={`font-semibold text-sm ${
                        tripPlan.budgetAnalysis.withinBudget ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {tripPlan.budgetAnalysis.withinBudget 
                          ? `Within Budget! ₹${tripPlan.budgetAnalysis.savings} saved` 
                          : `Over Budget by ₹${Math.abs(tripPlan.budgetAnalysis.savings)}`
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Gemini AI Insights */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Gemini AI Insights</h3>
                  </div>
                  <div className="space-y-2">
                    {tripPlan.geminiInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget Alternatives */}
                {tripPlan.budgetAnalysis.alternatives.length > 0 && (
                  <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Navigation className="w-5 h-5 text-yellow-600" />
                      <h3 className="font-semibold text-yellow-800">Budget Recommendations</h3>
                    </div>
                    <ul className="space-y-2">
                      {tripPlan.budgetAnalysis.alternatives.map((alternative, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-yellow-700">{alternative}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Route Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Route Breakdown</h3>
                  <div className="space-y-4">
                    {tripPlan.routes.map((route, index) => (
                      <div key={index}>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                              index === 0 
                                ? 'bg-green-500' 
                                : index === tripPlan.routes.length - 1 
                                  ? 'bg-red-500' 
                                  : 'bg-blue-500'
                            }`}>
                              {index === 0 || index === tripPlan.routes.length - 1 ? (
                                <MapPin className="w-6 h-6 text-white" />
                              ) : (
                                <span className="text-white font-bold text-sm">{index}</span>
                              )}
                            </div>
                            <span className={`text-xs font-medium mt-1 ${
                              index === 0 
                                ? 'text-green-600' 
                                : index === tripPlan.routes.length - 1 
                                  ? 'text-red-600' 
                                  : 'text-blue-600'
                            }`}>
                              {index === 0 ? 'START' : index === tripPlan.routes.length - 1 ? 'END' : 'STOP'}
                            </span>
                          </div>
                          <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-800">
                                  {route.from} → {route.to}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {route.distance} • {Math.floor(route.time / 60)}h {route.time % 60}m
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-green-600">₹{route.fare}</div>
                                <div className="text-xs text-gray-500">fare</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Alternative Transport Options */}
                        {route.alternatives.length > 0 && (
                          <div className="ml-16 mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-xs font-medium text-blue-700 mb-1">Alternative Options:</div>
                            <div className="space-y-1">
                              {route.alternatives.map((alternative, altIndex) => (
                                <div key={altIndex} className="text-xs text-blue-600 flex items-center gap-2">
                                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                  {alternative}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Connecting Line */}
                        {index < tripPlan.routes.length - 1 && (
                          <div className="flex justify-center">
                            <div className="w-0.5 h-8 bg-gradient-to-b from-blue-300 to-purple-300"></div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Total Summary */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <Navigation className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-purple-800">Complete Journey</div>
                            <div className="text-sm text-purple-600">
                              {tripPlan.routes.length} segment{tripPlan.routes.length > 1 ? 's' : ''} • Multi-day trip
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-700">₹{tripPlan.totalFare}</div>
                          <div className="text-sm text-purple-600">
                            {Math.floor(tripPlan.totalTime / 60)}h {tripPlan.totalTime % 60}m
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Optimization Summary */}
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-indigo-800">Gemini AI Optimization</span>
                  </div>
                  <p className="text-sm text-indigo-700">
                    Gemini AI analyzed multiple route combinations considering real-world factors like highway conditions, 
                    driver availability, and inter-city travel constraints. The AI recommends alternative transport modes 
                    for significant cost and time savings on this long-distance journey.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Route className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Plan your trip with Gemini AI</p>
                <p className="text-gray-400 text-sm mt-2">
                  Add locations, set budget, and let Gemini AI optimize your journey
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;