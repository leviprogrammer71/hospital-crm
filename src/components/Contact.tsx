import React, { useState } from 'react';
import { Send, Building, Mail, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    hospital: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', hospital: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#11698E] mb-4">
            Ready to Transform Your Hospital?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book a personalized walkthrough or get in touch with our team to learn how CuraOS can streamline your operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold text-[#11698E] mb-6">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-[#5CDB95] mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#11698E] mb-1">Email Support</h4>
                  <p className="text-gray-600">hello@curaos.app</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Building className="h-6 w-6 text-[#5CDB95] mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#11698E] mb-1">Enterprise Solutions</h4>
                  <p className="text-gray-600">Custom implementations for large hospitals</p>
                  <p className="text-sm text-gray-500">Dedicated support team included</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MessageSquare className="h-6 w-6 text-[#5CDB95] mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#11698E] mb-1">Schedule a Demo</h4>
                  <p className="text-gray-600">30-minute personalized walkthrough</p>
                  <p className="text-sm text-gray-500">See how CuraOS fits your workflow</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="inline h-4 w-4 mr-2" />
                  Hospital/Clinic Name
                </label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent transition-colors"
                  placeholder="Your hospital or clinic name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent transition-colors"
                  placeholder="your.email@hospital.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="inline h-4 w-4 mr-2" />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#11698E] focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your hospital's needs..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#11698E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0e5a7a] transition-colors flex items-center justify-center group"
              >
                <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;