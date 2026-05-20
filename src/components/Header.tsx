import React from 'react';
import { Heart, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-[#11698E]" />
              <span className="ml-2 text-xl font-bold text-[#11698E]">CuraOS</span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-[#11698E] transition-colors">Features</a>
            <a href="#demo" className="text-gray-700 hover:text-[#11698E] transition-colors">Demo</a>
            <a href="#about" className="text-gray-700 hover:text-[#11698E] transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-[#11698E] transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-[#11698E] hover:text-[#5CDB95] transition-colors">
              View Demo
            </button>
            <button className="bg-[#11698E] text-white px-4 py-2 rounded-lg hover:bg-[#0e5a7a] transition-colors">
              Book Walkthrough
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#11698E]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-[#11698E]">Features</a>
              <a href="#demo" className="block px-3 py-2 text-gray-700 hover:text-[#11698E]">Demo</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-[#11698E]">About</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-[#11698E]">Contact</a>
              <div className="px-3 py-2 space-y-2">
                <button className="block w-full text-left text-[#11698E] hover:text-[#5CDB95]">
                  View Demo
                </button>
                <button className="block w-full bg-[#11698E] text-white px-4 py-2 rounded-lg hover:bg-[#0e5a7a] transition-colors">
                  Book Walkthrough
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;