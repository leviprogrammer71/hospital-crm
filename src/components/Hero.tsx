import React from 'react';
import { Play, Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-[#11698E] to-[#0e5a7a] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Smarter Hospital Operations with{' '}
              <span className="text-[#5CDB95]">CuraOS</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#A2D5F2] mb-8 leading-relaxed">
              The all-in-one admin solution for your clinic or hospital
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#5CDB95] text-[#11698E] px-8 py-4 rounded-lg font-semibold hover:bg-[#4bc785] transition-colors flex items-center justify-center group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                View Demo
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#11698E] transition-colors flex items-center justify-center">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Walkthrough
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-1 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gray-100 rounded-xl p-8 min-h-96">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-[#FF6B6B] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#5CDB95] rounded-full"></div>
                    <div className="w-3 h-3 bg-[#A2D5F2] rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">CuraOS Dashboard</div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[#11698E]">Today's Overview</h3>
                      <span className="text-sm text-[#5CDB95]">Live</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#11698E]">47</div>
                        <div className="text-sm text-gray-600">Patients</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#5CDB95]">12</div>
                        <div className="text-sm text-gray-600">Staff Online</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#11698E] mb-2">Recent Activities</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-[#5CDB95] rounded-full mr-2"></div>
                        <span className="text-gray-700">Patient check-in completed</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-[#A2D5F2] rounded-full mr-2"></div>
                        <span className="text-gray-700">Staff schedule updated</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-[#FF6B6B] rounded-full mr-2"></div>
                        <span className="text-gray-700">Critical alert resolved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;