import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Predictor = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentCommand, setCurrentCommand] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [predictions, setPredictions] = useState([]);
  const [eegData, setEegData] = useState({
    labels: Array.from({ length: 50 }, (_, i) => i),
    datasets: [
      {
        label: 'Channel 1',
        data: Array(50).fill(0),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        pointRadius: 0
      },
      {
        label: 'Channel 2',
        data: Array(50).fill(0),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4,
        pointRadius: 0
      }
    ]
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Simulate EEG data updates
        setEegData(prevData => ({
          ...prevData,
          datasets: prevData.datasets.map(dataset => ({
            ...dataset,
            data: [...dataset.data.slice(1), Math.random() * 2 - 1]
          }))
        }));

        // Simulate command predictions
        const commands = ['Yes', 'No', 'Forward', 'Backward', 'Alert'];
        const randomConfidence = Math.random() * 100;
        
        if (randomConfidence > 90) {
          const newCommand = commands[Math.floor(Math.random() * commands.length)];
          setCurrentCommand(newCommand);
          setConfidence(randomConfidence);
          
          setPredictions(prev => [{
            command: newCommand,
            confidence: randomConfidence.toFixed(2),
            timestamp: new Date().toLocaleTimeString()
          }, ...prev].slice(0, 10));
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0
    },
    scales: {
      y: {
        min: -1,
        max: 1,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  return (
    <div className="w-full p-6 bg-[#1a1a1a] rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Live Command Prediction</h2>
        <button
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isActive 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? 'Stop Prediction' : 'Start Prediction'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-white">Real-time EEG Signal</h3>
          <div className="h-[300px]">
            <Line data={eegData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-white">Current Prediction</h3>
          
          <div className="mb-8">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold mb-2 text-blue-400">
                {currentCommand || 'Waiting...'}
              </div>
              <div className="text-gray-400">
                Confidence: {confidence.toFixed(2)}%
              </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-white">Recent Predictions</h4>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {predictions.map((pred, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-[#3a3a3a] rounded-lg"
                >
                  <div className="flex items-center">
                    <span className="font-medium text-white">{pred.command}</span>
                    <span className="ml-2 text-sm text-gray-400">
                      ({pred.confidence}%)
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">{pred.timestamp}</span>
                </div>
              ))}
              {predictions.length === 0 && (
                <div className="text-center text-gray-500 py-6">
                  No predictions yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictor; 