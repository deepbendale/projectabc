import React from 'react';
import MapComponent from './components/map/MapComponent';
import DroneControls from './components/controls/DroneControls';

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Drone Map Control</h1>
      </header>
      <main className="flex-1 relative">
        <MapComponent />
        <div className="absolute bottom-0 left-0 right-0">
          <DroneControls />
        </div>
      </main>
    </div>
  );
};

export default App;
