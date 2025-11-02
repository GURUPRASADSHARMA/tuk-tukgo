"use client"
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Heart, Star, Users, Zap, Check, Gift, Crown, Currency } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import Razorpay from 'razorpay';





const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDonated, setIsDonated] = useState(false);
  const [raisedAmount,setRaisedAmount] = useState(0);
  const [donars,setDonars] =useState(0)
  const predefinedAmounts = [25,50, 100, 250, 500, 1000, 2000];


  const donation = async ()=>{
    const res = await axios.get("/api/get-total-donation");
    setRaisedAmount(res.data.donation)
    setDonars(res.data.length)
  }

const recentContribution=async ()=>{
  const res = await axios.get("/api/get-recent-contribution")
  console.log(res)
}

useEffect(()=>{
donation();


})
  
  const handleDonate = async () => {
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount || amount <= 0) return;



    try {
      setIsProcessing(true);
  
      const {data} = await axios.post("/api/donation",{
        amount,
        action:"create"
      })
      
  
      const {orderId} = data
      if(!orderId){
        console.log("Order creation failed")
       throw new Error("Order creation failed");
      }
      const options = {
        key:process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
        amount:amount*100,
        currency:"INR",
        name: "Guru Prasad Donations",
        description: "Support my open-source work ❤️",
        order_id:orderId,
        handler: async function (response:any){
          // response me sab kuch apne app aa jayega when payment is done now using the info in response we verify that payment is done or not
          const verifyRes = await axios.post("/api/donation",{
            amount,
            action:"verify",
            ...response
          })
         if (verifyRes.data.success) {
            setIsDonated(true);
            setTimeout(() => {
              setSelectedAmount(null);
              setCustomAmount("");
              setIsDonated(false);
            }, 3000);
          } else {
            alert("Payment verification failed.");
          }  
        },
        theme: {
        color: "#6366f1", // optional styling
      },
      };

      console.log(process.env.NEXT_PUBLIC_RAZORPAY_API_KEY)

const razorpay = new (window as any).Razorpay(options)
razorpay.open();

    } catch (error) {
      console.error("Donation failed:", error);
    alert("Something went wrong. Please try again.");
    }finally {
    setIsProcessing(false);
  }



    // Simulate payment processing
    // setTimeout(() => {
    //   setIsProcessing(false);
    //   setIsDonated(true);
    //   setTimeout(() => {
    //     setSelectedAmount(null);
    //     setCustomAmount('');
    //     setIsDonated(false);
    //   }, 3000);
    // }, 2500);
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: 'Faster Calculations',
      description: 'Enhanced AI algorithms for instant fare predictions'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: 'Bigger Database',
      description: 'Expand coverage to more cities and routes'
    },
    {
      icon: <Star className="w-6 h-6 text-purple-500" />,
      title: 'Premium Features',
      description: 'Advanced trip planning and analytics tools'
    }
  ];

  const donorBenefits = [
    { tier: 'Supporter', amount: 50, benefits: ['Ad-free experience', 'Priority support'], icon: <Heart className="w-5 h-5 text-pink-500" /> },
    { tier: 'Champion', amount: 250, benefits: ['All Supporter benefits', 'Early access to features', 'Donor badge'], icon: <Star className="w-5 h-5 text-yellow-500" /> },
    { tier: 'Legend', amount: 1000, benefits: ['All Champion benefits', 'Monthly reports', 'Feature requests'], icon: <Crown className="w-5 h-5 text-purple-500" /> },
  ];

  const recentDonors = [
    { name: 'Rahul M.', amount: '₹500', time: '2 hours ago', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
    { name: 'Priya S.', amount: '₹250', time: '5 hours ago', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
    { name: 'Anonymous', amount: '₹1000', time: '1 day ago', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
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
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Support AutoFare
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Donation Section */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-pink-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Help Us Grow</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Your support helps us expand our database, improve AI algorithms, 
                  and keep AutoFare free for everyone in the community.
                </p>
              </div>

              {/* Impact Stats */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{raisedAmount}</div>
                  <div className="text-gray-600">Raised This Month</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">{donars}</div>
                  <div className="text-gray-600">Generous Donors</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">Coming Soon</div>
                  <div className="text-gray-600">Goal Achieved</div>
                </div>
              </div>

              {/* Donation Form */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Donation Amount</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                        className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                          selectedAmount === amount
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Amount (₹)</label>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="Enter custom amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-bolder text-black"
                  />
                </div>

                <button
                  onClick={handleDonate}
                  disabled={(!selectedAmount && !customAmount) || isProcessing}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : isDonated ? (
                    <>
                      <Check className="w-5 h-5" />
                      Thank You for Your Support!
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      Donate ₹{selectedAmount || customAmount || 0}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Features Your Donation Supports */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Your Donation Supports</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="flex justify-center mb-4">{feature.icon}</div>
                    <h4 className="font-semibold text-gray-800 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Donor Benefits */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Donor Benefits [Coming-Soon]
                it will automatically credited in future
              </h3>
              <div className="space-y-4">
                {donorBenefits.map((tier, index) => (
                  <div key={index} className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      {tier.icon}
                      <h4 className="text-lg font-semibold text-gray-800">{tier.tier}</h4>
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        ₹{tier.amount}+
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-gray-600">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Progress */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Goal</h3>
              <div className="space-y-4">
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>coming soon</span>
                    <span>comming soon</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {/* 85% complete • ₹5,000 remaining */}
                </p>
              </div>
            </div>

            {/* Recent Donors */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Supporters</h3>
              <div className="space-y-4">
                {recentDonors.map((donor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={donor.avatar}
                      alt={donor.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{donor.name}</div>
                      <div className="text-sm text-gray-500">{donor.time}</div>
                    </div>
                    <div className="font-semibold text-pink-600">{donor.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-800">Rajesh Kumar</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                "AutoFare has saved me so much money and hassle! Supporting this amazing project 
                was the least I could do. Keep up the great work!"
              </p>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Secure Donations</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>100% secure payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Transparent fund usage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;