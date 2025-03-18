import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const DroneTable = ({ markers, onDelete }) => {
  return (
    <div className="h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Drone Markers</h2>
      <div className="overflow-auto max-h-[calc(100vh-6rem)]">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Drone ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Coordinates</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Zone</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {markers.map((marker) => (
              <tr key={marker.id} className={`
                ${marker.zone === 'Red' ? 'bg-red-50' : 
                  marker.zone === 'Yellow' ? 'bg-yellow-50' : 
                  'bg-green-50'} hover:bg-opacity-80 transition-colors
              `}>
                <td className="px-4 py-3 text-sm text-gray-900">{marker.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {marker.longitude.toFixed(4)}, {marker.latitude.toFixed(4)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${marker.zone === 'Red' ? 'bg-red-100 text-red-800' : 
                      marker.zone === 'Yellow' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'}
                  `}>
                    {marker.zone}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <IconButton 
                    onClick={() => onDelete(marker.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </td>
              </tr>
            ))}
            {markers.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                  No markers added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DroneTable;
