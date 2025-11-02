"use client"
import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, DollarSign, Plus, Check, Users, Star, TrendingUp, Minus, Route } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios'
import { useSession } from 'next-auth/react';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';



type Contribution = {
  from: string;
  to: string;
  price: number | string;
  checkpoints: number;
  contributor?: string; // optional if you map it
  time?: string;        // optional if you map createdAt
};

interface Checkpoint {
  id: string;
  location: string;
  price: string;
}

const ContributionPage= () => {

  const {data:session}= useSession();
  const userId = session?.user._id
  console.log(userId)
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
     const res =  await axios.post("/api/request-for-admin",{
        userId,
        reason
      }).catch((error:any)=>{
          if(error.response){
            console.log(error.response.data.message)
            setError(error.response.data.message)
          }
      })

      console.log(res)
      setSuccess(true);

      setReason('');
    } catch (err: any) {
 
      setError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contribution,setContribution]=useState(0);

  const contributioCount = async()=>{
    try {
      const res = await axios.post("/api/get-your-contribution")
      setContribution(res.data.contribution)
      
    } catch (error) {
      console.log("something went wrong during fetching contribution count",error)
    }
  }

  

  const isAdmin = session?.user.isAdmin

  const addCheckpoint = () => {
    const newCheckpoint: Checkpoint = {
      id: Date.now().toString(),
      location: '',
      price: ''
    };
    setCheckpoints([...checkpoints, newCheckpoint]);
  };

  const removeCheckpoint = (id: string) => {
    setCheckpoints(checkpoints.filter(checkpoint => checkpoint.id !== id));
  };

  const updateCheckpoint = (id: string, field: 'location' | 'price', value: string) => {
    setCheckpoints(checkpoints.map(checkpoint => 
      checkpoint.id === id ? { ...checkpoint, [field]: value } : checkpoint
    ));
  };
  

  // useEffect(()=>{
  //   const total= checkpoints.reduce((sum,u)=>sum + parseInt(u.price),0) + parseInt(finalPrice)
  //   setTotalPrice(total)
  // },[finalPrice,checkpoints])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !finalPrice) return;
    setIsSubmitting(true);    

    const data = {
      from,
      to,
      finalPrice:parseInt(finalPrice),
      checkpoints:checkpoints.map((obj)=>({
        ...obj,
        price:parseInt(obj.price)
      }))

    }
    console.log(data)
    // api call for contribution
    const res = await axios.post('/api/contribute-price-api',data)
    console.log(res)


    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setFrom('');
        setTo('');
        setFinalPrice('');
        setCheckpoints([]);
        setIsSubmitted(false);
      }, 2000);
    }, 1500);
  };
  
  const calculateTotalCheckpointPrice = () => {
    return checkpoints.reduce((total, checkpoint) => {
      return total + (parseFloat(checkpoint.price) || 0);
    }, 0);
  };
  const [recentContributions,setRecentContribution] = useState<Contribution[]>([]);
  // const recentContributions = [
  //   { from: 'MG Road', to: 'Koramangala', price: '₹85', contributor: 'Rahul M.', time: '2 mins ago', checkpoints: 2 },
  //   { from: 'Whitefield', to: 'Brigade Road', price: '₹180', contributor: 'Priya S.', time: '5 mins ago', checkpoints: 3 },
  //   { from: 'Electronic City', to: 'Indiranagar', price: '₹220', contributor: 'Amit K.', time: '8 mins ago', checkpoints: 1 },
  //   { from: 'Hebbal', to: 'Jayanagar', price: '₹160', contributor: 'Sneha R.', time: '12 mins ago', checkpoints: 0 },
  // ];
  
  const topContributors = [
    { name: 'Rajesh Kumar', contributions: 45, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
    { name: 'Priya Sharma', contributions: 38, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
    { name: 'Amit Verma', contributions: 32, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  ];
  const getRecentcontribution = async()=>{
    const res = await axios.post("/api/get-recent-contribution");
    setRecentContribution((prev)=>[...prev,...res.data.data])
  }
  useEffect( ()=>{
    getRecentcontribution();
    contributioCount();
  },[])
  
 
  return (
    <main>
      {isAdmin?( 
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
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
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Contribute Data
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contribution Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Add Fare Data</h2>
                  <p className="text-gray-600">Help the community with accurate fare information</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="e.g., MG Road"
                        className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-500 text-bold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="e.g., Koramangala"
                        className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-500 text-bold"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Checkpoints Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">Checkpoints (Optional)</label>
                    <button
                      type="button"
                      onClick={addCheckpoint}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Checkpoint
                    </button>
                  </div>
                  
                  {checkpoints.length > 0 && (
                    <div className="space-y-4 mb-4">
                      {checkpoints.map((checkpoint, index) => (
                        <div key={checkpoint.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                              {index + 1}
                            </div>
                            <h4 className="font-medium text-gray-800">Checkpoint {index + 1}</h4>
                            <button
                              type="button"
                              onClick={() => removeCheckpoint(checkpoint.id)}
                              className="ml-auto p-1 rounded-full hover:bg-red-100 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                  type="text"
                                  value={checkpoint.location}
                                  onChange={(e) => updateCheckpoint(checkpoint.id, 'location', e.target.value)}
                                  placeholder="e.g., Silk Board"
                                  className="w-full pl-10 pr-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm text-gray-500 text-bold"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Price (₹)</label>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                  type="number"
                                  value={checkpoint.price}
                                  onChange={(e) => updateCheckpoint(checkpoint.id, 'price', e.target.value)}
                                  placeholder="e.g., 25"
                                  className="w-full pl-10 pr-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm text-gray-500 text-bold"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Checkpoint Summary */}
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-blue-700 font-medium">Total Checkpoint Price:</span>
                          <span className="text-blue-800 font-bold">₹{calculateTotalCheckpointPrice()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Final Destination Price (₹)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={finalPrice}
                      onChange={(e) => setFinalPrice(e.target.value)}
                      placeholder="e.g., 85"
                      className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-500 text-bold"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This is the total fare from start to final destination
                  </p>
                </div>

                {/* Total Summary */}
                {(checkpoints.length > 0 || finalPrice) && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Route Summary</h4>
                    <div className="space-y-2 text-sm">
                      {checkpoints.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Checkpoints ({checkpoints.length}):</span>
                          <span className="font-medium text-blue-600">₹{calculateTotalCheckpointPrice()}</span>
                        </div>
                      )}
                      {finalPrice && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Final destination:</span>
                          <span className="font-medium text-green-600">₹{finalPrice}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold">
                        <span className="text-gray-800">Total Journey:</span>
                        <span className="text-lg text-green-700">₹{(calculateTotalCheckpointPrice() + (parseFloat(finalPrice) || 0)).toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Journey Flowchart */}
                {(from || to || checkpoints.length > 0) && (
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Route className="w-5 h-5 text-blue-600" />
                      Journey Path
                    </h4>
                    
                    <div className="space-y-4">
                      {/* Start Location */}
                      {from && (
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                              <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xs font-medium text-green-600 mt-1">START</span>
                          </div>
                          <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-green-200">
                            <div className="font-medium text-gray-800">{from}</div>
                            <div className="text-sm text-gray-500">Starting point</div>
                          </div>
                        </div>
                      )}

                      {/* Connecting Line */}
                      {from && (checkpoints.length > 0 || to) && (
                        <div className="flex justify-center">
                          <div className="w-0.5 h-8 bg-gradient-to-b from-green-300 to-blue-300"></div>
                        </div>
                      )}

                      {/* Checkpoints */}
                      {checkpoints.map((checkpoint, index) => (
                        <div key={checkpoint.id}>
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-sm">{index + 1}</span>
                              </div>
                              <span className="text-xs font-medium text-blue-600 mt-1">STOP</span>
                            </div>
                            <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-blue-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-gray-800">
                                    {checkpoint.location || `Checkpoint ${index + 1}`}
                                  </div>
                                  <div className="text-sm text-gray-500">Intermediate stop</div>
                                </div>
                                {checkpoint.price && (
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-blue-600">₹{checkpoint.price}</div>
                                    <div className="text-xs text-gray-500">fare</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Connecting Line */}
                          {(index < checkpoints.length - 1 || to) && (
                            <div className="flex justify-center">
                              <div className="w-0.5 h-8 bg-gradient-to-b from-blue-300 to-purple-300"></div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* End Location */}
                      {to && (
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                              <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xs font-medium text-red-600 mt-1">END</span>
                          </div>
                          <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-red-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-800">{to}</div>
                                <div className="text-sm text-gray-500">Final destination</div>
                              </div>
                              {finalPrice && (
                                <div className="text-right">
                                  <div className="text-lg font-bold text-red-600">₹{finalPrice}</div>
                                  <div className="text-xs text-gray-500">total fare</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Total Journey Summary */}
                      {from && to && (checkpoints.length > 0 || finalPrice) && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                <Route className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="font-bold text-purple-800">Complete Journey</div>
                                <div className="text-sm text-purple-600">
                                  {from} → {checkpoints.length > 0 && `${checkpoints.length} stops → `}{to}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-purple-700">
                                ₹{(calculateTotalCheckpointPrice() + (parseFloat(finalPrice) || 0)).toFixed(0)}
                              </div>
                              <div className="text-sm text-purple-600">total cost</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={!from || !to || !finalPrice || isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Submitted Successfully!
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Contribute Data
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <h3 className="font-semibold text-gray-800">Why Contribute?</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Help fellow travelers get accurate fare estimates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Earn contributor badges and recognition
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    Build a more transparent transportation system
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    Add checkpoints for detailed route pricing
                  </li>
                </ul>
              </div>
            </div>

            {/* Recent Contributions */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Contributions</h3>
              <div className="space-y-4">
                {recentContributions.map((contribution, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {contribution.from} → {contribution.to}
                      </div>
                      <div className="text-sm text-gray-500">
                        by {contribution.contributor} • {contribution.time}
                        {contribution.checkpoints > 0 && (
                          <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                            <Route className="w-3 h-3" />
                            {contribution.checkpoints} stops
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      {contribution.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Contributions</span>
                  <span className="text-2xl font-bold text-green-600">{contribution}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Helpfulness Score</span>
                  <span className="text-2xl font-bold text-blue-600">Coming soon..</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Community Rank</span>
                  <span className="text-2xl font-bold text-purple-600">Coming soon..</span>
                </div>
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-bold text-gray-800">Top Contributors</h3>
              </div>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{contributor.name}</div>
                      <div className="text-sm text-gray-500">{contributor.contributions} contributions</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border border-blue-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Provide accurate, recent fare information
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use specific, recognizable location names
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Report standard meter/negotiated fares
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>):(
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 text-center">
              Admin Verification Required
            </h1>
            <p className="text-slate-600 text-center mt-2 text-sm leading-relaxed">
              You need admin privileges to contribute to LocalFair Auto Price
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-blue-900 text-sm leading-relaxed text-center">
              CONTRIBUTE YOUR OWN LOCAL AREA FAIR PRICE...
              Help build a transparent marketplace! By contributing local price data, you empower consumers to make informed decisions and promote fair pricing in your community.
            </p>
          </div>

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-green-900 font-semibold text-sm">Request Submitted!</h3>
                  <p className="text-green-700 text-xs mt-1">
                    Your admin request has been received. We'll review it and get back to you soon.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitRequest} className="space-y-5">
              {/* <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="your.email@example.com"
                />
              </div> */}

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-2">
                 Mention the place or region where you’d like to contribute.
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
                  placeholder="Mention the place or region where you’d like to contribute. like city or famous landmark like around India-Gate or any other"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Request Admin Access'
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              Admin requests are reviewed manually. You'll receive an email notification once your request is processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
      }
    </main>
  );
};

export default ContributionPage;