import React, {useState} from 'react';

const ZOOM_DEFAULT = [14];

export const AppContext = React.createContext({
  location: null, setLocation: () => {},
  mapCenter: null, setMapCenter: () => {},
  mapMoved: null, setMapMoved: () => {},
  mapZoom: ZOOM_DEFAULT, setMapZoom: () => {},
  point: null, setPoint: () => {},
  points: [],
  savePoint: () => {},
  selectedPoint: null, setSelectedPoint: () => {},
})

export const AppProvider = (props) => {
  const [location, setLocation] = useState();
  const [mapCenter, setMapCenter] = useState();
  const [mapMoved, setMapMoved] = useState();
  const [mapZoom, setMapZoom] = useState(ZOOM_DEFAULT);
  const [point, setPoint] = useState();
  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState();
  const savePoint = (data, id) => {
    if (id != null) {
      points[id] = data;
      return setSelectedPoint();
    }
    const newPoint = {
      coords: point.coords,
      ...data
    }
    setPoints([
      ...points,
      newPoint
    ]);
    setPoint();
  }
  
  return (
    <AppContext.Provider value={{
      location, setLocation,
      mapCenter, setMapCenter,
      mapMoved, setMapMoved,
      mapZoom, setMapZoom,
      point, setPoint,
      points,
      savePoint,
      selectedPoint, setSelectedPoint,
    }}>
      {props.children}
    </AppContext.Provider>
  );
}
