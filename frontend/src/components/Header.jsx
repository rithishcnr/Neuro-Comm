import React, { useState } from 'react';

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="bg-[#1a1a1a] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/helmet-logo.svg" alt="Helmet Logo" className="h-10 w-10 mr-3" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Silent Communication Helmet
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#dashboard" className="text-gray-300 hover:text-white transition">Dashboard</a>
            <a href="#training" className="text-gray-300 hover:text-white transition">Training</a>
            <a href="#analytics" className="text-gray-300 hover:text-white transition">Analytics</a>
            <a href="#settings" className="text-gray-300 hover:text-white transition">Settings</a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
              <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 