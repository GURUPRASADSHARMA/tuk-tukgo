'use client'
import React, { useState } from 'react';
import { MapPin, ArrowRight, DollarSign, Map } from 'lucide-react';
import LiveMap from '@/components/LiveMap';
import Link from 'next/link';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setFrom, setTo } from '@/store/store';

const MainPage: React.FC = () => {
    const [data,setData]=useState({
        start:"",
        end:""
    });
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();


  const handleGetPrice = async () => {
    if (!data.start.trim() || !data.end.trim()) return;
    setIsLoading(true);
    dispatch(setFrom(data.start));
    dispatch(setTo(data.end))
    try {
        const res= await axios.post("/api/priceData",data);
        setTimeout(() => {
      setPrice(res.data[0].price);
    }, 1500);
} catch (error) {
    console.log("errror in db call")
}

setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">FairPrice</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 min-h-[calc(100vh-200px)]">
          {/* Pricing Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Your Fair Price</h2>
                <p className="text-gray-600">
                  Enter your journey details to get an instant, transparent price quote
                </p>
              </div>

              <div className="space-y-6">
                {/* From Input */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-green-500" />
                    </div>
                    <input
                      type="text"
                      value={data.start}
                      onChange={(e) => setData({...data,start:e.target.value})}
                      placeholder="Enter pickup location"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex justify-center">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                  </div>
                </div>

                {/* To Input */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-red-500" />
                    </div>
                    <input
                      type="text"
                      value={data.end}
                      onChange={(e) => setData({...data,end:e.target.value})}
                      placeholder="Enter destination"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Get Price Button */}
                <button
                  onClick={handleGetPrice}
                  disabled={!data.start.trim() || !data.end.trim() || isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Calculating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <DollarSign className="w-5 h-5" />
                      <span>Get Fair Price</span>
                    </div>
                  )}
                </button>

                {/* Price Display */}
                {price !== null && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600 mb-2">Your Fair Price</p>
                      <div className="text-4xl font-bold text-green-600 mb-2">Rs.{price}</div>
                      <p className="text-sm text-gray-500">
                        From {data.start} to {data.end}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <DollarSign className="w-6 h-6 text-blue-600" />,
                  bg: 'bg-blue-100',
                  title: 'Fair Pricing',
                  desc: 'Transparent, upfront pricing with no hidden fees',
                },
                {
                  icon: <MapPin className="w-6 h-6 text-green-600" />,
                  bg: 'bg-green-100',
                  title: 'Accurate Routes',
                  desc: 'Real-time route optimization for best prices',
                },
                {
                  icon: <ArrowRight className="w-6 h-6 text-purple-600" />,
                  bg: 'bg-purple-100',
                  title: 'Instant Quotes',
                  desc: 'Get your price quote in seconds, not minutes',
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
                >
                  <div className="text-center">
                    <div className={`${card.bg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                      {card.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 h-[600px] flex flex-col">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Map className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Route Preview</h3>
              </div>

              <div className="relative w-full h-full">
  <LiveMap />
</div>


            </div>
            
            {/* <div className='bg-blue-200 rounded-2xl shadow-xl border border-gray-100 h-[104px] p-2 rounded-lg flex justify-center item-center mt-4 pt-10 text-xl bolder'>
             <link href="/aiTrip">AI TRIP PLANNER </link>
            </div> */}

            <div className='flex flex-row '>


            <Link
            href={"/aiTrip"}
            >
            <button className="group mt-4  ml-2 relative shadow-xl border border-gray-100 inline-flex items-center w-[300px] justify-center px-8 py-4 text-lg font-semibold text-blue-900 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50">
              <span className="relative z-10 flex items-center space-x-2">
                <span className='cursor-pointer'>AI TRIP PLANNER</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-30 transition-opacity duration-150"></div>
            </button>
            </Link>
            <Link
            href={"/contribution"}
            >
            <button className="group mt-4 relative shadow-xl border border-gray-100 inline-flex items-center w-[300px] justify-center px-8 py-4 text-lg font-semibold text-blue-900 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50">
              <span className="relative z-9 flex items-center space-x-2">
                <span className='cursor-pointer'>WANT TO CONTRIBUTE</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-30 transition-opacity duration-150"></div>
            </button>
            </Link>
            </div>
           
          
          </div>

        </div>
      </div>
    </div>
  );
};

export default MainPage;
