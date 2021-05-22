import {useContext, useEffect, useState} from 'react';
import {AppContext, AppProvider} from './contexts/AppContext';

import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow, faTimes, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'

import Map from './components/map.react';
import PointForm from './components/point-form.react';

import useRect from './hooks/useRect';

function Content() {
  const {location, setLocation, mapCenter, setMapCenter, point, setPoint, selectedPoint, setSelectedPoint} = useContext(AppContext);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [box, heightRef] = useRect();
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(setLocationFromPosition);
  }

  const setLocationFromPosition = (position) => {
    if (!position && !position.coords) {
      console.error('bad location')
      return setLoadingLoc(false);
    }
    setLocation([
      position.coords.longitude,
      position.coords.latitude,
    ]);
    setLoadingLoc(false);
  }

  const height = box.height || 300;

  function addPoint() {
    setPoint({
      coords: mapCenter || location,
    });
    setSelectedPoint();
  }

  function clearPoint() {
    setPoint();
    setSelectedPoint();
  }

  function handleLocation() {
    getLocation();
    setMapCenter();
  }

  return (
    <div className="App" ref={heightRef}>
      {loadingLoc && <div>Loading</div>}
      {location != null && <div className="map">
        <Map
          height={height}
        />
      </div>}
      <div className="main">
        <div className="buttons">
          {(point || selectedPoint != null) ? (
            <div className="button" onClick={clearPoint}>
              <div className="icon">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          ) : (
            <div className="button" onClick={addPoint}>
              <div className="icon">
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          )}
          <div className="button disabled">
            <div className="icon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
          <div className="button" onClick={handleLocation}>
            <div className={`icon ${loadingLoc ? 'locating' : ''}`}>
              <FontAwesomeIcon icon={faLocationArrow} />
            </div>
          </div>
        </div>
        {(point || selectedPoint != null) && <PointForm />}
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Content />
    </AppProvider>
  )
}

export default App;
