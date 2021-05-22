import React, {useState} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ZOOM_DEFAULT = [16];

export const AppContext = React.createContext({
  location: null, setLocation: () => {},
  mapCenter: null, setMapCenter: () => {},
  mapMoved: null, setMapMoved: () => {},
  mapZoom: ZOOM_DEFAULT, setMapZoom: () => {},
  point: null, setPoint: () => {},
  points: [],
  savePoint: () => {},
  selectedPoint: null, setSelectedPoint: () => {},
  editingPoint: null, setEditingPoint: () => {},
})

export const AppProvider = (props) => {
  const [location, setLocation] = useState();
  const [mapCenter, setMapCenter] = useState();
  const [mapMoved, setMapMoved] = useState();
  const [mapZoom, setMapZoom] = useState(ZOOM_DEFAULT);
  const [point, setPoint] = useState();
  const [points, setPoints] = useLocalStorage('points', []);
  const [selectedPoint, setSelectedPoint] = useState();
  const [editingPoint, setEditingPoint] = useState(false);
  const savePoint = (data, id) => {
    if (id != null) {
      const newPoints = [...points];
      newPoints[id] = data;
      setPoints(newPoints);
    } else {
      const newPoint = {
        coords: point.coords,
        ...data
      }
      setPoints([
        ...points,
        newPoint
      ]);
    }
    
    setPoint();
    setSelectedPoint();
    setEditingPoint(false);
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
      editingPoint, setEditingPoint
    }}>
      {props.children}
    </AppContext.Provider>
  );
}
