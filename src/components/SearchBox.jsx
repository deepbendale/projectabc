import React from 'react';
import { useControl } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const SearchBox = ({ onResult, mapboxToken }) => {
  useControl(
    () => {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxToken,
        marker: false,
        collapsed: false
      });
      
      geocoder.on('result', (evt) => {
        onResult(evt.result);
      });

      return geocoder;
    },
    {
      position: 'top-left'
    }
  );

  return null;
};

export default SearchBox;
