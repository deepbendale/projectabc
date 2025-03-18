import React from 'react';

const DroneControls = () => {
  return (
    <div className="flex gap-4 p-4">
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Take Off
      </button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Land
      </button>
    </div>
  );
};

export default DroneControls;
