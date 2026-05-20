import React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { roles } from '../utils/roles';
import { useNavigate } from 'react-router-dom';

const roleToPath: Record<string, string> = {
  receptionist: '/frontdesk',
  pharmacy: '/pharmacy',
  nurse: '/nurse',
  doctor: '/doctor',
  admin: '/admin',
};

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('receptionist');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role as any);
    navigate(roleToPath[role]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2D4B8E] to-[#FF6B98]">
      <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex flex-col items-start justify-between w-1/2 bg-gradient-to-b from-[#5B9BD5] to-[#3A7CC3] p-10 relative">
          {/* Logo */}
          <div className="flex items-center text-white">
            <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 16L12 20L20 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12L12 16L20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-xl">My Discounted Labs</span>
          </div>
          
          {/* Medical Professional Image - This would be replaced with an actual image in production */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* This would be an actual image in production */}
              <div className="w-64 h-64 rounded-full bg-blue-300 flex items-center justify-center overflow-hidden">
                <svg className="w-40 h-40 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              
              {/* Colorful design elements */}
              <div className="absolute -right-4 top-1/4 w-8 h-16 bg-[#FF6B98] rounded-full transform rotate-12"></div>
              <div className="absolute -left-4 bottom-1/4 w-8 h-16 bg-yellow-300 rounded-full transform -rotate-12"></div>
              <div className="absolute top-0 -right-8 w-6 h-6 bg-red-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-white text-xs opacity-80">
            Copyright © 2019. My Discounted Labs. All rights reserved.
          </div>
        </div>
        
        {/* Right Side (Login Form) */}
        <div className="flex-1 flex flex-col justify-center p-10">
          <div className="w-full max-w-md mx-auto">
            {/* Tabs */}
            <div className="flex mb-8">
              <button
                className={`px-4 py-2 font-semibold ${activeTab === 'signup' ? 'text-[#4A7ACD] border-b-2 border-[#4A7ACD]' : 'text-gray-400'}`}
                onClick={() => setActiveTab('signup')}
                type="button"
              >
                Sign Up
              </button>
              <button
                className={`px-4 py-2 font-semibold ${activeTab === 'signin' ? 'text-[#4A7ACD] border-b-2 border-[#4A7ACD]' : 'text-gray-400'}`}
                onClick={() => setActiveTab('signin')}
                type="button"
              >
                Sign In
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7ACD]"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                    placeholder="Abrego"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7ACD]"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="Abrego@email.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7ACD]"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
              
              {activeTab === 'signin' && (
                <div>
                  <label className="block text-gray-600 mb-1">Role</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7ACD]"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  >
                    {roles.map(r => (
                      <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-[#4A7ACD] text-white py-3 rounded-lg font-semibold hover:bg-[#3A6ABD] transition-colors"
              >
                Sign {activeTab === 'signup' ? 'Up' : 'In'}
              </button>
              
              {activeTab === 'signup' ? (
                <div className="text-center mt-4 text-[#FF6B98]">
                  I have an Account ?
                </div>
              ) : (
                <div className="text-center mt-4">
                  <a href="#" className="text-[#FF6B98]">Forgot Password?</a>
                </div>
              )}
            </form>
            
            {/* Social Media Icons */}
            <div className="mt-10 flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#4A7ACD]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4A7ACD]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4A7ACD]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4A7ACD]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#4A7ACD]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z" />
                </svg>
              </a>
            </div>
            
            {/* Contact Information */}
            <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                9599812"67
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@mydiscountedlabs.in
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
