import React, { useEffect, useState, useCallback } from 'react';
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { IconButton, Tooltip } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import SearchBox from './SearchBox';
import DroneTable from './DroneTable';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVlcGJlbmRhbGUiLCJhIjoiY204ZWMxOXgxMmtzdjJqczVmdm1renNxZyJ9.2SN5xNzK_jLrTQJCD-4zlg';

const MapComponent = () => {
  const [viewState, setViewState] = useState({
    longitude: 73.9147,
    latitude: 18.5599,
    zoom: 12
  });
  
  const [markers, setMarkers] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  
  // Viman Nagar, Pune (Yellow Zone) - More accurate polygon
  const yellowZones = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [73.9132, 18.5529],
          [73.9189, 18.5612],
          [73.9245, 18.5629],
          [73.9298, 18.5601],
          [73.9332, 18.5529],
          [73.9298, 18.5457],
          [73.9245, 18.5429],
          [73.9189, 18.5446],
          [73.9132, 18.5529]
        ]]
      }
    }]
  };

  // Kharadi, Pune (Red Zone) - More accurate polygon
  const redZones = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [73.9432, 18.5489],
          [73.9478, 18.5567],
          [73.9532, 18.5589],
          [73.9586, 18.5567],
          [73.9632, 18.5489],
          [73.9586, 18.5411],
          [73.9532, 18.5389],
          [73.9478, 18.5411],
          [73.9432, 18.5489]
        ]]
      }
    }]
  };

  // Layer styles with improved visual effects
  const yellowZoneLayer = {
    id: 'yellow-zone',
    type: 'fill',
    paint: {
      'fill-color': '#ffeb3b',
      'fill-opacity': 0.3,
      'fill-outline-color': '#ffc107'
    }
  };

  const redZoneLayer = {
    id: 'red-zone',
    type: 'fill',
    paint: {
      'fill-color': '#f44336',
      'fill-opacity': 0.3,
      'fill-outline-color': '#d32f2f'
    }
  };

  // Updated helper function to use more precise polygon checking
  const getZoneType = (coordinates) => {
    const [lng, lat] = coordinates;
    
    // Check if in Viman Nagar (Yellow Zone)
    if (lng >= 73.9132 && lng <= 73.9332 &&
        lat >= 73.9429 && lat <= 73.9629) {
      return 'Yellow';
    }
    
    // Check if in Kharadi (Red Zone)
    if (lng >= 73.9432 && lng <= 73.9632 &&
        lat >= 73.9389 && lat <= 73.9589) {
      return 'Red';
    }
    
    return 'Safe';
  };

  const handleSearch = (result) => {
    if (result && result.bbox) {
      setSelectedArea({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [result.bbox[0], result.bbox[1]],
            [result.bbox[0], result.bbox[3]],
            [result.bbox[2], result.bbox[3]],
            [result.bbox[2], result.bbox[1]],
            [result.bbox[0], result.bbox[1]]
          ]]
        }
      });
      
      setViewState({
        longitude: result.center[0],
        latitude: result.center[1],
        zoom: 14
      });
    }
  };

  const handleMapClick = useCallback((event) => {
    if (isAddingMarker) {
      const { lng, lat } = event.lngLat;
      const newMarker = {
        id: Date.now(),
        longitude: lng,
        latitude: lat,
        zone: getZoneType([lng, lat])
      };
      setMarkers(prev => [...prev, newMarker]);
      setIsAddingMarker(false);
    }
  }, [isAddingMarker]);

  const onMarkerDragEnd = useCallback((id, event) => {
    const { lng, lat } = event.lngLat;
    setMarkers(prev =>
      prev.map(marker =>
        marker.id === id
          ? {
              ...marker,
              longitude: lng,
              latitude: lat,
              zone: getZoneType([lng, lat])
            }
          : marker
      )
    );
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <div className="relative flex-1">
        <div className="absolute top-2.5 right-2.5 z-10 bg-white rounded shadow-md">
          <Tooltip title={isAddingMarker ? "Click on map to place marker" : "Add new marker"}>
            <IconButton
              onClick={() => setIsAddingMarker(!isAddingMarker)}
              className={`${isAddingMarker ? 'text-blue-500' : 'text-gray-700'}`}
            >
              <AddLocationIcon />
            </IconButton>
          </Tooltip>
        </div>

        <ReactMapGL
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
          onClick={handleMapClick}
          className={`w-full h-full ${isAddingMarker ? 'cursor-crosshair' : 'cursor-grab'}`}
        >
          <SearchBox onResult={handleSearch} mapboxToken={MAPBOX_TOKEN} />
          
          <Source id="yellow-zones" type="geojson" data={yellowZones}>
            <Layer {...yellowZoneLayer} />
          </Source>
          <Source id="red-zones" type="geojson" data={redZones}>
            <Layer {...redZoneLayer} />
          </Source>

          {selectedArea && (
            <Source id="selected-area" type="geojson" data={selectedArea}>
              <Layer
                id="selected-area-layer"
                type="line"
                paint={{
                  'line-color': '#2196f3',
                  'line-width': 2
                }}
              />
            </Source>
          )}

          {markers.map(marker => (
            <Marker
              key={marker.id}
              longitude={marker.longitude}
              latitude={marker.latitude}
              draggable
              onDragEnd={(e) => onMarkerDragEnd(marker.id, e)}
            >
              <div className={`w-6 h-6 -mt-6 -ml-3 cursor-move rounded-full border-2 border-white ${
                marker.zone === 'Red' ? 'bg-red-500' :
                marker.zone === 'Yellow' ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
            </Marker>
          ))}
        </ReactMapGL>
      </div>
      <div className="w-1/3 min-w-[300px] p-4 bg-white shadow-lg">
      <DroneTable markers={markers} onDelete={(id) => setMarkers(prev => prev.filter(m => m.id !== id))} />
      </div>
    </div>
  );
};

export default MapComponent;
