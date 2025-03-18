// Utility functions for map operations
export const calculateDistance = (point1, point2) => {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;
  // Basic distance calculation
  return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
};

export const createWaypoint = (latitude, longitude, altitude = 0) => {
  return {
    lat: latitude,
    lng: longitude,
    alt: altitude,
    timestamp: Date.now()
  };
};
