import React, { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import EEGPlot from './components/EEGPlot'
import Trainer from './components/Trainer'
import Predictor from './components/Predictor'

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'training':
        return <Trainer />;
      case 'predictor':
        return <Predictor />;
      case 'eeg':
        return <EEGPlot />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#18181b] border-r border-gray-800 flex flex-col py-8 px-4 min-h-screen">
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-[#23232a] hover:text-white'
              }`}
            >
              <span className="inline-block mr-2">📊</span> Dashboard
            </button>
            <button
              onClick={() => setCurrentView('training')}
              className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                currentView === 'training'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-[#23232a] hover:text-white'
              }`}
            >
              <span className="inline-block mr-2">🎤</span> Training
            </button>
            <button
              onClick={() => setCurrentView('predictor')}
              className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                currentView === 'predictor'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-[#23232a] hover:text-white'
              }`}
            >
              <span className="inline-block mr-2">🔮</span> Live Prediction
            </button>
            <button
              onClick={() => setCurrentView('eeg')}
              className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                currentView === 'eeg'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-[#23232a] hover:text-white'
              }`}
            >
              <span className="inline-block mr-2">🧠</span> Raw EEG Data
            </button>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 bg-[#18181b] min-h-screen">
          {renderView()}
        </main>
      </div>
    </div>
  )
}

export default App
