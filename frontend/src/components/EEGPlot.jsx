import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to your Flask server
const socket = io('http://localhost:5000'); // Adjust if needed (e.g., use your local network IP)

const EEGPlot = () => {
  // State to hold the EEG data and predicted command
  const [eegData, setEegData] = useState([]);
  const [predictedCommand, setPredictedCommand] = useState(null);

  // Listen for new data from Flask backend
  useEffect(() => {
    // Listen for 'eeg_data' event from Flask
    socket.on('eeg_data', (data) => {
      console.log(data); // Log the incoming data
      setEegData((prevData) => [...prevData, data]); // Update EEG data state
    });

    // Listen for 'predicted_command' event from Flask
    socket.on('predicted_command', (command) => {
      console.log(command); // Log the predicted command
      setPredictedCommand(command); // Update the predicted command state
    });

    // Clean up on component unmount
    return () => {
      socket.off('eeg_data');
      socket.off('predicted_command');
    };
  }, []);

  // Render EEG data (e.g., as a plot or list) and predicted command
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Real-time EEG Data</h1>
      <div className="mb-6">
        {eegData.length > 0 ? (
          <ul className="space-y-2">
            {eegData.map((data, index) => (
              <li key={index} className="bg-gray-800 p-2 rounded">{data}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No EEG data available yet</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-3">Predicted Command</h2>
      <div className="bg-gray-900 p-4 rounded-lg">
        {predictedCommand ? (
          <p className="text-green-400 font-medium">{predictedCommand}</p>
        ) : (
          <p className="text-gray-400">No command predicted yet</p>
        )}
      </div>
    </div>
  );
};

export default EEGPlot; 