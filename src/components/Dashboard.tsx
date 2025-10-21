// "use client"
// import React, { useState } from 'react';
// import { MapPin, Navigation, Calculator, Menu, X, LogOut, User, Heart, Users, Zap } from 'lucide-react';



// const Dashboard = () => {
//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState('');
//   const [fareResult, setFareResult] = useState<number | null>(null);
//   const [isCalculating, setIsCalculating] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const calculateFare = async () => {
//     if (!from || !to) return;
    
//     setIsCalculating(true);
    
//     // Simulate fare calculation
//     setTimeout(() => {
//       const distance = Math.random() * 20 + 2; // 2-22 km
//       const baseFare = 25;
//       const perKmRate = 12;
//       const calculatedFare = baseFare + (distance * perKmRate);
      
//       setFareResult(Math.round(calculatedFare));
//       setIsCalculating(false);
//     }, 2000);
//   };

//   const popularRoutes = [
//     { from: 'MG Road', to: 'Koramangala', fare: '₹85' },
//     { from: 'Brigade Road', to: 'Whitefield', fare: '₹180' },
//     { from: 'Indiranagar', to: 'Electronic City', fare: '₹220' },
//     { from: 'Jayanagar', to: 'Hebbal', fare: '₹160' },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
//       {/* Header */}
//       <header className="bg-white shadow-lg border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setIsSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 <Menu className="w-6 h-6 text-gray-600" />
//               </button>
//               <div className="flex items-center gap-2">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
//                   <Navigation className="w-6 h-6 text-white" />
//                 </div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
//                   AutoFare
//                 </h1>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <img
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="text-gray-700 font-medium"></span>
//               </div>
//               <button
//                 className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 <LogOut className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none`}>
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-8 lg:hidden">
//               <h2 className="text-xl font-bold text-gray-800">Menu</h2>
//               <button
//                 onClick={() => setIsSidebarOpen(false)}
//                 className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
            
//             <nav className="space-y-4">
//               <button
                
//                 className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium"
//               >
//                 <Calculator className="w-5 h-5" />
//                 Fare Calculator
//               </button>
              
//               <button
                
//                 className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
//               >
//                 <Users className="w-5 h-5" />
//                 Contribute Data
//               </button>
              
//               <button
         
//                 className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
//               >
//                 <Zap className="w-5 h-5" />
//                 AI Trip Planner
//               </button>
              
//               <button
             
//                 className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
//               >
//                 <Heart className="w-5 h-5" />
//                 Support Us
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Overlay */}
//         {isSidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//             onClick={() => setIsSidebarOpen(false)}
//           />
//         )}

//         {/* Main Content */}
//         <div className="flex-1 p-6">
//           <div className="max-w-6xl mx-auto">
//             <div className="grid lg:grid-cols-2 gap-8">
              
//               {/* Fare Calculator */}
//               <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                     <Calculator className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-800">Calculate Fare</h2>
//                 </div>
                
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
//                     <div className="relative">
//                       <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="text"
//                         value={from}
//                         onChange={(e) => setFrom(e.target.value)}
//                         placeholder="Enter pickup location"
//                         className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-bold text-gray-500"
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
//                     <div className="relative">
//                       <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="text"
//                         value={to}
//                         onChange={(e) => setTo(e.target.value)}
//                         placeholder="Enter destination"
//                         className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-bold text-gray-500"
//                       />
//                     </div>
//                   </div>
                  
//                   <button
//                     onClick={calculateFare}
//                     disabled={!from || !to || isCalculating}
//                     className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {isCalculating ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                         Calculating...
//                       </>
//                     ) : (
//                       'Calculate Fare'
//                     )}
//                   </button>
                  
//                   {fareResult && (
//                     <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 animate-fade-in">
//                       <div className="text-center">
//                         <div className="text-sm text-gray-600 mb-2">Estimated Fare</div>
//                         <div className="text-4xl font-bold text-green-600">₹{fareResult}</div>
//                         <div className="text-sm text-gray-500 mt-2">
//                           *Fare may vary based on traffic and waiting time
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Popular Routes */}
//                 <div className="mt-8">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Routes</h3>
//                   <div className="space-y-3">
//                     {popularRoutes.map((route, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
//                         onClick={() => {
//                           setFrom(route.from);
//                           setTo(route.to);
//                         }}
//                       >
//                         <div className="flex-1">
//                           <div className="text-sm font-medium text-gray-800">
//                             {route.from} → {route.to}
//                           </div>
//                         </div>
//                         <div className="text-sm font-semibold text-green-600">
//                           {route.fare}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Map Section */}
//               <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                     <MapPin className="w-6 h-6 text-green-600" />
//                   </div>
//                   <h2 className="text-2xl font-bold text-gray-800">Route Map</h2>
//                 </div>
                
//                 <div className="bg-gray-100 rounded-xl h-64 md:h-80 flex items-center justify-center relative overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200 opacity-50"></div>
//                   <div className="relative z-10 text-center">
//                     <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-600 font-medium">Interactive Map Coming Soon</p>
//                     <p className="text-gray-500 text-sm mt-2">Real-time route visualization</p>
//                   </div>
                  
//                   {/* Animated dots */}
//                   <div className="absolute top-8 left-8 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
//                   <div className="absolute top-16 right-12 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
//                   <div className="absolute bottom-12 left-16 w-4 h-4 bg-yellow-500 rounded-full animate-bounce"></div>
//                   <div className="absolute bottom-8 right-8 w-3 h-3 bg-red-500 rounded-full animate-pulse delay-1000"></div>
//                 </div>

//                 <div className="mt-6 grid grid-cols-2 gap-4">
//                   <div className="text-center p-4 bg-blue-50 rounded-xl">
//                     <div className="text-2xl font-bold text-blue-600">4.8★</div>
//                     <div className="text-sm text-gray-600">User Rating</div>
//                   </div>
//                   <div className="text-center p-4 bg-green-50 rounded-xl">
//                     <div className="text-2xl font-bold text-green-600">12 min</div>
//                     <div className="text-sm text-gray-600">Avg. Wait Time</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;