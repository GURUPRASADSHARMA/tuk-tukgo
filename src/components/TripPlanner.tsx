// "use client"
// import React, { useState } from 'react';
// import { ArrowLeft, Zap, MapPin, Clock, DollarSign, Route, Plus, Trash2 } from 'lucide-react';
// import { User,Page } from '@/app/page';

// interface TripPlannerProps {
//   user: User | null;
//   onNavigate: (page: Page) => void;
// }

// interface Stop {
//   id: string;
//   location: string;
// }

// interface TripPlan {
//   totalFare: number;
//   totalTime: number;
//   routes: Array<{
//     from: string;
//     to: string;
//     fare: number;
//     time: number;
//     distance: string;
//   }>;
// }

// const TripPlanner: React.FC<TripPlannerProps> = ({ user, onNavigate }) => {
//   const [startLocation, setStartLocation] = useState('');
//   const [stops, setStops] = useState<Stop[]>([]);
//   const [endLocation, setEndLocation] = useState('');
//   const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
//   const [isPlanning, setIsPlanning] = useState(false);

//   const addStop = () => {
//     const newStop: Stop = {
//       id: Date.now().toString(),
//       location: ''
//     };
//     setStops([...stops, newStop]);
//   };

//   const removeStop = (id: string) => {
//     setStops(stops.filter(stop => stop.id !== id));
//   };

//   const updateStop = (id: string, location: string) => {
//     setStops(stops.map(stop => 
//       stop.id === id ? { ...stop, location } : stop
//     ));
//   };

//   const planTrip = async () => {
//     if (!startLocation || !endLocation) return;

//     setIsPlanning(true);

//     // Simulate AI trip planning
//     setTimeout(() => {
//       const allLocations = [startLocation, ...stops.map(s => s.location).filter(Boolean), endLocation];
//       const routes = [];
//       let totalFare = 0;
//       let totalTime = 0;

//       for (let i = 0; i < allLocations.length - 1; i++) {
//         const fare = Math.floor(Math.random() * 150) + 50;
//         const time = Math.floor(Math.random() * 30) + 10;
//         const distance = (Math.random() * 15 + 2).toFixed(1);

//         routes.push({
//           from: allLocations[i],
//           to: allLocations[i + 1],
//           fare,
//           time,
//           distance: `${distance} km`
//         });

//         totalFare += fare;
//         totalTime += time;
//       }

//       setTripPlan({
//         totalFare,
//         totalTime,
//         routes
//       });
//       setIsPlanning(false);
//     }, 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
//       {/* Header */}
//       <header className="bg-white shadow-lg border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center h-16">
//             <button
//               onClick={() => onNavigate('dashboard')}
//               className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <ArrowLeft className="w-6 h-6 text-gray-600" />
//             </button>
//             <div className="flex items-center gap-2">
//               <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
//                 <Zap className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 AI Trip Planner
//               </h1>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid lg:grid-cols-2 gap-8">
          
//           {/* Trip Planning Form */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                 <Route className="w-6 h-6 text-purple-600" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">Plan Your Trip</h2>
//                 <p className="text-gray-600">AI-optimized routes with cost breakdown</p>
//               </div>
//             </div>

//             <div className="space-y-6">
//               {/* Start Location */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Start Location</label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
//                   <input
//                     type="text"
//                     value={startLocation}
//                     onChange={(e) => setStartLocation(e.target.value)}
//                     placeholder="Where are you starting from?"
//                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Stops */}
//               {stops.map((stop, index) => (
//                 <div key={stop.id}>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Stop {index + 1}
//                   </label>
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
//                     <input
//                       type="text"
//                       value={stop.location}
//                       onChange={(e) => updateStop(stop.id, e.target.value)}
//                       placeholder="Add a stop"
//                       className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                     />
//                     <button
//                       onClick={() => removeStop(stop.id)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-red-100 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4 text-red-500" />
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {/* Add Stop Button */}
//               <button
//                 onClick={addStop}
//                 className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center gap-2"
//               >
//                 <Plus className="w-5 h-5" />
//                 Add Stop
//               </button>

//               {/* End Location */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">End Location</label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
//                   <input
//                     type="text"
//                     value={endLocation}
//                     onChange={(e) => setEndLocation(e.target.value)}
//                     placeholder="Where do you want to go?"
//                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>

//               {/* Plan Trip Button */}
//               <button
//                 onClick={planTrip}
//                 disabled={!startLocation || !endLocation || isPlanning}
//                 className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {isPlanning ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                     AI is planning your trip...
//                   </>
//                 ) : (
//                   <>
//                     <Zap className="w-5 h-5" />
//                     Plan Optimal Trip
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* AI Features */}
//             <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
//               <h3 className="font-semibold text-gray-800 mb-3">AI Optimization Features</h3>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                   <span className="text-gray-600">Route Optimization</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                   <span className="text-gray-600">Cost Minimization</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   <span className="text-gray-600">Time Efficiency</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                   <span className="text-gray-600">Traffic Consideration</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Trip Plan Results */}
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Trip Plan</h2>
            
//             {tripPlan ? (
//               <div className="space-y-6">
//                 {/* Summary */}
//                 <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
//                   <div className="grid grid-cols-2 gap-4 text-center">
//                     <div>
//                       <div className="flex items-center justify-center gap-2 mb-2">
//                         <DollarSign className="w-5 h-5 text-green-600" />
//                         <span className="text-sm text-gray-600">Total Fare</span>
//                       </div>
//                       <div className="text-3xl font-bold text-green-600">₹{tripPlan.totalFare}</div>
//                     </div>
//                     <div>
//                       <div className="flex items-center justify-center gap-2 mb-2">
//                         <Clock className="w-5 h-5 text-blue-600" />
//                         <span className="text-sm text-gray-600">Total Time</span>
//                       </div>
//                       <div className="text-3xl font-bold text-blue-600">{tripPlan.totalTime}m</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Route Details */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Route Breakdown</h3>
//                   <div className="space-y-4">
//                     {tripPlan.routes.map((route, index) => (
//                       <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
//                         <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-semibold text-purple-600">
//                           {index + 1}
//                         </div>
//                         <div className="flex-1">
//                           <div className="font-medium text-gray-800">
//                             {route.from} → {route.to}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {route.distance} • {route.time} minutes
//                           </div>
//                         </div>
//                         <div className="text-lg font-semibold text-green-600">
//                           ₹{route.fare}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Savings Info */}
//                 <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Zap className="w-5 h-5 text-yellow-600" />
//                     <span className="font-semibold text-yellow-800">AI Optimization</span>
//                   </div>
//                   <p className="text-sm text-yellow-700">
//                     Our AI has optimized your route to save you ₹{Math.floor(tripPlan.totalFare * 0.15)} 
//                     and {Math.floor(tripPlan.totalTime * 0.2)} minutes compared to traditional planning.
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <Route className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500 font-medium">Plan your trip to see optimized routes</p>
//                 <p className="text-gray-400 text-sm mt-2">
//                   Add your start and end locations, then let AI do the magic
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TripPlanner;