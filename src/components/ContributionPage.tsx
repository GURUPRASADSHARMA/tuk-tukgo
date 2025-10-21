// "use client"
// import React, { useState } from 'react';
// import { ArrowLeft, MapPin, DollarSign, Plus, Check, Users, Star, TrendingUp } from 'lucide-react';




// const ContributionPage= () => {
//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState('');
//   const [price, setPrice] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!from || !to || !price) return;

//     setIsSubmitting(true);
    
//     // Simulate submission
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setIsSubmitted(true);
//       setTimeout(() => {
//         setFrom('');
//         setTo('');
//         setPrice('');
//         setIsSubmitted(false);
//       }, 2000);
//     }, 1500);
//   };

//   const recentContributions = [
//     { from: 'MG Road', to: 'Koramangala', price: '₹85', contributor: 'Rahul M.', time: '2 mins ago' },
//     { from: 'Whitefield', to: 'Brigade Road', price: '₹180', contributor: 'Priya S.', time: '5 mins ago' },
//     { from: 'Electronic City', to: 'Indiranagar', price: '₹220', contributor: 'Amit K.', time: '8 mins ago' },
//     { from: 'Hebbal', to: 'Jayanagar', price: '₹160', contributor: 'Sneha R.', time: '12 mins ago' },
//   ];

//   const topContributors = [
//     { name: 'Rajesh Kumar', contributions: 45, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
//     { name: 'Priya Sharma', contributions: 38, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
//     { name: 'Amit Verma', contributions: 32, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
//       {/* Header */}
//       <header className="bg-white shadow-lg border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center h-16">
//             <button
              
//               className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <ArrowLeft className="w-6 h-6 text-gray-600" />
//             </button>
//             <div className="flex items-center gap-2">
//               <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
//                 <Users className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//                 Contribute Data
//               </h1>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid lg:grid-cols-3 gap-8">
          
//           {/* Contribution Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                   <Plus className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-800">Add Fare Data</h2>
//                   <p className="text-gray-600">Help the community with accurate fare information</p>
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">From Location</label>
//                     <div className="relative">
//                       <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="text"
//                         value={from}
//                         onChange={(e) => setFrom(e.target.value)}
//                         placeholder="e.g., MG Road"
//                         className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">To Location</label>
//                     <div className="relative">
//                       <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <input
//                         type="text"
//                         value={to}
//                         onChange={(e) => setTo(e.target.value)}
//                         placeholder="e.g., Koramangala"
//                         className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Fare Price (₹)</label>
//                   <div className="relative">
//                     <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="number"
//                       value={price}
//                       onChange={(e) => setPrice(e.target.value)}
//                       placeholder="e.g., 85"
//                       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={!from || !to || !price || isSubmitting}
//                   className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       Submitting...
//                     </>
//                   ) : isSubmitted ? (
//                     <>
//                       <Check className="w-5 h-5" />
//                       Submitted Successfully!
//                     </>
//                   ) : (
//                     <>
//                       <Plus className="w-5 h-5" />
//                       Contribute Data
//                     </>
//                   )}
//                 </button>
//               </form>

//               <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
//                 <div className="flex items-center gap-3 mb-3">
//                   <Star className="w-6 h-6 text-yellow-500" />
//                   <h3 className="font-semibold text-gray-800">Why Contribute?</h3>
//                 </div>
//                 <ul className="space-y-2 text-sm text-gray-600">
//                   <li className="flex items-center gap-2">
//                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
//                     Help fellow travelers get accurate fare estimates
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
//                     Earn contributor badges and recognition
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
//                     Build a more transparent transportation system
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* Recent Contributions */}
//             <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//               <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Contributions</h3>
//               <div className="space-y-4">
//                 {recentContributions.map((contribution, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                     <div className="flex-1">
//                       <div className="font-medium text-gray-800">
//                         {contribution.from} → {contribution.to}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         by {contribution.contributor} • {contribution.time}
//                       </div>
//                     </div>
//                     <div className="text-lg font-semibold text-green-600">
//                       {contribution.price}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-8">
//             {/* Stats */}
//             <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
//               <h3 className="text-lg font-bold text-gray-800 mb-4">Your Impact</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Contributions</span>
//                   <span className="text-2xl font-bold text-green-600">12</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Helpfulness Score</span>
//                   <span className="text-2xl font-bold text-blue-600">4.8★</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-600">Community Rank</span>
//                   <span className="text-2xl font-bold text-purple-600">#15</span>
//                 </div>
//               </div>
//             </div>

//             {/* Top Contributors */}
//             <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <TrendingUp className="w-5 h-5 text-yellow-500" />
//                 <h3 className="text-lg font-bold text-gray-800">Top Contributors</h3>
//               </div>
//               <div className="space-y-4">
//                 {topContributors.map((contributor, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <div className="relative">
//                       <img
//                         src={contributor.avatar}
//                         alt={contributor.name}
//                         className="w-10 h-10 rounded-full"
//                       />
//                       <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
//                         {index + 1}
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <div className="font-medium text-gray-800">{contributor.name}</div>
//                       <div className="text-sm text-gray-500">{contributor.contributions} contributions</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Community Guidelines */}
//             <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border border-blue-200 p-6">
//               <h3 className="text-lg font-bold text-gray-800 mb-3">Guidelines</h3>
//               <ul className="space-y-2 text-sm text-gray-600">
//                 <li className="flex items-start gap-2">
//                   <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                   Provide accurate, recent fare information
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                   Use specific, recognizable location names
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                   Report standard meter/negotiated fares
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContributionPage;