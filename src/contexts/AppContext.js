import React, {useState} from 'react';

const ZOOM_DEFAULT = [16];

export const AppContext = React.createContext({
  location: null, setLocation: () => {},
  mapCenter: null, setMapCenter: () => {},
  mapMoved: null, setMapMoved: () => {},
  mapZoom: ZOOM_DEFAULT, setMapZoom: () => {},
  point: null, setPoint: () => {},
  points: [],
  selectedPoint: null, setSelectedPoint: () => {},
  editingPoint: null, setEditingPoint: () => {},
})

export const AppProvider = (props) => {
  const [location, setLocation] = useState();
  const [mapCenter, setMapCenter] = useState();
  const [mapMoved, setMapMoved] = useState();
  const [mapZoom, setMapZoom] = useState(ZOOM_DEFAULT);
  const [point, setPoint] = useState();
  const [selectedPoint, setSelectedPoint] = useState();
  const [editingPoint, setEditingPoint] = useState(false);
  
  return (
    <AppContext.Provider value={{
      location, setLocation,
      mapCenter, setMapCenter,
      mapMoved, setMapMoved,
      mapZoom, setMapZoom,
      point, setPoint,
      selectedPoint, setSelectedPoint,
      editingPoint, setEditingPoint
    }}>
      {props.children}
    </AppContext.Provider>
  );
}
