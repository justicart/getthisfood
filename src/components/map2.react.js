import {useContext, useEffect, useState} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useDebounce from '../hooks/useDebounce';

import {AppContext} from '../contexts/AppContext';

import Pins from './pins.react.js';
import SelectedPin from './selectedPin.react.js';

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Map() {
  const {location, mapCenter, setMapCenter, mapZoom, setMapZoom, point, pointData, selectedPoint, setSelectedPoint, editingPoint} = useContext(AppContext);
  const [viewport, setViewport] = useState({
    latitude: location[1],
    longitude: location[0],
    zoom: mapZoom[0]
  });
  const dbViewport = useDebounce(viewport, 300);
  useEffect(() => {
    setMapCenter([dbViewport.longitude, dbViewport.latitude]);
    setMapZoom(dbViewport.zoom);
  }, [dbViewport]);

  const openPointDetails = (_key) => {
    if (point || editingPoint) {
      return;
    }
    setSelectedPoint(_key)
  }
  
  const closePointDetails = () => {
    setSelectedPoint();
  }

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <Pins points={pointData} openPointDetails={openPointDetails} />
      {selectedPoint != null && <SelectedPin points={pointData} selectedPoint={selectedPoint} closePointDetails={closePointDetails} />}
    </ReactMapGL>
  );
}