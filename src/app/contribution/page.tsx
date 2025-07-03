'use client'
import React, { useState } from 'react';
import { MapPin, DollarSign, Send, CheckCircle, Loader } from 'lucide-react';
import axios from 'axios';

interface FormData {
  from: string;
  to: string;
  localFairPrice: string;
}

interface FormErrors {
  from?: string;
  to?: string;
  localFairPrice?: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    from: '',
    to: '',
    localFairPrice: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);




  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.from.trim()) {
      newErrors.from = 'Origin location is required';
    }
    
    if (!formData.to.trim()) {
      newErrors.to = 'Destination location is required';
    }
    
    if (!formData.localFairPrice.trim()) {
      newErrors.localFairPrice = 'Local fair price is required';
    } else if (isNaN(Number(formData.localFairPrice)) || Number(formData.localFairPrice) <= 0) {
      newErrors.localFairPrice = 'Please enter a valid price';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const res =await axios.post("/api/contribution",formData);
    if(!res){
      throw new Error("something went wrong during api call of db to insert row")
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success animation
    setTimeout(() => {
      setFormData({ from: '', to: '', localFairPrice: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const resetForm = () => {
    setFormData({ from: '', to: '', localFairPrice: '' });
    setErrors({});
    setIsSubmitted(false);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contribute Fair Pricing
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Help others by sharing local transportation costs in your area
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* From Field */}
                <div className="space-y-2">
                  <label htmlFor="from" className="block text-sm font-semibold text-gray-700 mb-3">
                    From Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="from"
                      value={formData.from}
                      onChange={(e) => handleInputChange('from', e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.from 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="Enter starting location"
                    />
                  </div>
                  {errors.from && (
                    <p className="text-red-500 text-sm font-medium">{errors.from}</p>
                  )}
                </div>

                {/* To Field */}
                <div className="space-y-2">
                  <label htmlFor="to" className="block text-sm font-semibold text-gray-700 mb-3">
                    To Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="to"
                      value={formData.to}
                      onChange={(e) => handleInputChange('to', e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.to 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="Enter destination location"
                    />
                  </div>
                  {errors.to && (
                    <p className="text-red-500 text-sm font-medium">{errors.to}</p>
                  )}
                </div>

                {/* Local Fair Price Field */}
                <div className="space-y-2">
                  <label htmlFor="localFairPrice" className="block text-sm font-semibold text-gray-700 mb-3">
                    Local Fair Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="localFairPrice"
                      value={formData.localFairPrice}
                      onChange={(e) => handleInputChange('localFairPrice', e.target.value)}
                      step="0.01"
                      min="0"
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.localFairPrice 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-200 hover:border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.localFairPrice && (
                    <p className="text-red-500 text-sm font-medium">{errors.localFairPrice}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Contribution</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success State */
              <div className="text-center py-12 animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-bounce">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Thank You!
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Your contribution has been successfully submitted.<br />
                  This helps others plan their journeys better.
                </p>
                <button
                  onClick={resetForm}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Submit Another
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Your contributions help build a community-driven pricing database
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;