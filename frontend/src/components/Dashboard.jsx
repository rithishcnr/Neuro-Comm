import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [eegData, setEegData] = useState({
    labels: Array.from({ length: 50 }, (_, i) => i),
    datasets: [
      {
        label: 'Channel 1',
        data: Array(50).fill(0),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      }
    ]
  });

  const [currentCommand, setCurrentCommand] = useState(null);
  const [commandHistory, setCommandHistory] = useState([]);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    // Simulate real-time EEG data updates
    const interval = setInterval(() => {
      setEegData(prevData => ({
        ...prevData,
        datasets: prevData.datasets.map(dataset => ({
          ...dataset,
          data: [...dataset.data.slice(1), Math.random() * 2 - 1]
        }))
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 0
    },
    scales: {
      y: {
        min: -1,
        max: 1,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="w-full p-6 bg-[#1a1a1a] rounded-lg shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Real-time EEG Signal</h2>
          <div className="h-[300px]">
            <Line data={eegData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-[#2a2a2a] p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Command Recognition</h2>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span>Current Command:</span>
              <span className="text-2xl font-bold text-blue-400">
                {currentCommand || 'Waiting...'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Confidence:</span>
              <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
              <span>{confidence}%</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Command History</h3>
            <div className="h-[200px] overflow-y-auto">
              {commandHistory.map((cmd, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center p-2 bg-[#3a3a3a] rounded mb-2"
                >
                  <span>{cmd.command}</span>
                  <span className="text-sm text-gray-400">
                    {new Date(cmd.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-[#2a2a2a] p-4 rounded-lg text-center">
          <h3 className="font-bold mb-2">Alpha Waves</h3>
          <div className="text-2xl font-bold text-green-400">8-13 Hz</div>
          <div className="text-sm text-gray-400">Yes/No Commands</div>
        </div>

        <div className="bg-[#2a2a2a] p-4 rounded-lg text-center">
          <h3 className="font-bold mb-2">Beta Waves</h3>
          <div className="text-2xl font-bold text-blue-400">13-30 Hz</div>
          <div className="text-sm text-gray-400">Forward/Alert Commands</div>
        </div>

        <div className="bg-[#2a2a2a] p-4 rounded-lg text-center">
          <h3 className="font-bold mb-2">Signal Quality</h3>
          <div className="text-2xl font-bold text-yellow-400">Good</div>
          <div className="text-sm text-gray-400">Impedance: 5kΩ</div>
        </div>

        <div className="bg-[#2a2a2a] p-4 rounded-lg text-center">
          <h3 className="font-bold mb-2">System Status</h3>
          <div className="text-2xl font-bold text-purple-400">Online</div>
          <div className="text-sm text-gray-400">All systems nominal</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 