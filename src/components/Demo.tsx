import React from 'react';
import { Play, ExternalLink } from 'lucide-react';

const Demo = () => {
  return (
    <section id="demo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#11698E] mb-4">
            See CuraOS in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of CuraOS with our interactive demo. No signup required.
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#11698E] to-[#0e5a7a] rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Interactive Demo Available</h3>
              <p className="text-[#A2D5F2] mb-6 leading-relaxed">
                Explore our full-featured demo environment with sample data. Test patient management, 
                staff scheduling, and analytics dashboards just like you would in a real hospital setting.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#5CDB95] rounded-full mr-3"></div>
                  <span>Full patient and staff management system</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#5CDB95] rounded-full mr-3"></div>
                  <span>Real-time dashboard and analytics</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#5CDB95] rounded-full mr-3"></div>
                  <span>Mobile-responsive interface</span>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-6">
                <div className="text-4xl mb-2">🏥</div>
                <h4 className="text-xl font-semibold mb-2">Demo Environment</h4>
                <p className="text-[#A2D5F2] text-sm">
                  Fully functional with sample hospital data
                </p>
              </div>
              
              <button className="bg-[#5CDB95] text-[#11698E] px-8 py-4 rounded-lg font-semibold hover:bg-[#4bc785] transition-colors flex items-center justify-center w-full group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Try Demo Mode
                <ExternalLink className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;