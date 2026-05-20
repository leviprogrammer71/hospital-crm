import React from 'react';
import { Users, FileText, Calendar, Upload, BarChart3, Bell } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Users,
      title: 'Staff Management',
      description: 'Efficiently manage doctor schedules, nurse assignments, and administrative staff with role-based access controls.',
      color: 'bg-[#5CDB95]'
    },
    {
      icon: FileText,
      title: 'Patient CRM',
      description: 'Comprehensive patient records management with search, filtering, and history tracking capabilities.',
      color: 'bg-[#A2D5F2]'
    },
    {
      icon: Calendar,
      title: 'Appointment Scheduling',
      description: 'Smart scheduling system that prevents conflicts and optimizes resource allocation across departments.',
      color: 'bg-[#11698E]'
    },
    {
      icon: Upload,
      title: 'Digital File Uploads',
      description: 'Secure document management system for medical records, test results, and administrative documents.',
      color: 'bg-[#5CDB95]'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Department Insights',
      description: 'Real-time dashboards and reports to track performance, patient flow, and operational efficiency.',
      color: 'bg-[#FF6B6B]'
    },
    {
      icon: Bell,
      title: 'Critical Alerts System',
      description: 'Instant notifications for emergencies, system updates, and important patient status changes.',
      color: 'bg-[#A2D5F2]'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#11698E] mb-4">
            Everything You Need to Run Your Hospital
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CuraOS combines powerful features with an intuitive interface to streamline every aspect of hospital administration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#11698E] mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;