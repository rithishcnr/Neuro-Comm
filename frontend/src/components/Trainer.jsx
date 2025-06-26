import React, { useState } from 'react';

const Trainer = () => {
  const [selectedCommand, setSelectedCommand] = useState('');
  const [customCommand, setCustomCommand] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [trainingSessions, setTrainingSessions] = useState([]);

  const predefinedCommands = ['Yes', 'No', 'Forward', 'Backward', 'Alert'];

  const startRecording = () => {
    if (!selectedCommand && !customCommand) {
      alert('Please select or enter a command first');
      return;
    }

    setIsRecording(true);
    setRecordingTime(0);

    // Start the timer
    const timer = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 5) {
          clearInterval(timer);
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    const command = selectedCommand || customCommand;
    
    setTrainingSessions(prev => [
      ...prev,
      {
        id: Date.now(),
        command,
        timestamp: new Date().toLocaleTimeString(),
        duration: recordingTime,
        status: 'Completed'
      }
    ]);

    // Reset the form
    setSelectedCommand('');
    setCustomCommand('');
    setRecordingTime(0);
  };

  return (
    <div className="w-full p-6 bg-[#1a1a1a] rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-white">Command Training</h2>

      <div className="mb-8 bg-[#2a2a2a] p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Select Command</label>
            <select
              className="w-full bg-[#3a3a3a] text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCommand}
              onChange={(e) => {
                setSelectedCommand(e.target.value);
                setCustomCommand('');
              }}
              disabled={isRecording}
            >
              <option value="">Select a command...</option>
              {predefinedCommands.map(cmd => (
                <option key={cmd} value={cmd}>{cmd}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Custom Command</label>
            <input
              type="text"
              className="w-full bg-[#3a3a3a] text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter custom command..."
              value={customCommand}
              onChange={(e) => {
                setCustomCommand(e.target.value);
                setSelectedCommand('');
              }}
              disabled={isRecording}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            {isRecording && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-500 font-medium">Recording: {recordingTime}s</span>
              </div>
            )}
          </div>

          <button
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>
      </div>

      <div className="bg-[#2a2a2a] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="font-bold text-lg text-white">Training Sessions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#3a3a3a]">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Command</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {trainingSessions.map(session => (
                <tr key={session.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{session.command}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{session.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{session.duration}s</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      {session.status}
                    </span>
                  </td>
                </tr>
              ))}
              {trainingSessions.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No training sessions yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trainer; 