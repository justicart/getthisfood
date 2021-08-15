import React, {useEffect, useState} from 'react';
import {useEasybase} from 'easybase-react';

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
  pointData: [],
  mounted: () => {},
})

export const AppProvider = (props) => {
  const [location, setLocation] = useState();
  const [mapCenter, setMapCenter] = useState();
  const [mapMoved, setMapMoved] = useState();
  const [mapZoom, setMapZoom] = useState(ZOOM_DEFAULT);
  const [point, setPoint] = useState();
  const [selectedPoint, setSelectedPoint] = useState();
  const [editingPoint, setEditingPoint] = useState(false);
  const [easybaseData, setEasybaseData] = useState([]);
  const { db } = useEasybase();

  const mounted = async() => {
    const ebData = await db("POINTS", true).return().limit(10).all();
    console.log('ebData', ebData)
    setEasybaseData(ebData);
  }

  useEffect(() => {
    mounted();
  }, [])
  
  return (
    <AppContext.Provider value={{
      location, setLocation,
      mapCenter, setMapCenter,
      mapMoved, setMapMoved,
      mapZoom, setMapZoom,
      point, setPoint,
      selectedPoint, setSelectedPoint,
      editingPoint, setEditingPoint,
      pointData: easybaseData,
      mounted,
    }}>
      {props.children}
    </AppContext.Provider>
  );
}
