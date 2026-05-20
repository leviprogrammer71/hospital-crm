import React from 'react';
import { Heart, Github, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#11698E] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-[#5CDB95]" />
              <span className="ml-2 text-xl font-bold">CuraOS</span>
            </div>
            <p className="text-[#A2D5F2] mb-4 leading-relaxed">
              Transforming hospital operations with intelligent administration software. 
              Streamline your healthcare facility's workflow and focus on what matters most - patient care.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:hello@curaos.app" className="text-[#A2D5F2] hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#A2D5F2] hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-[#A2D5F2]">
              <li>
                <a href="#features" className="hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#demo" className="hover:text-white transition-colors flex items-center">
                  Demo
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-[#A2D5F2]">
              <li>
                <a href="mailto:hello@curaos.app" className="hover:text-white transition-colors">
                  hello@curaos.app
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#0e5a7a] mt-8 pt-8 text-center text-[#A2D5F2]">
          <p>&copy; {new Date().getFullYear()} CuraOS. All rights reserved. Built for healthcare professionals.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;