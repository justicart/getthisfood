import {useContext, useEffect, useState} from 'react';
import {AppContext, AppProvider} from './contexts/AppContext';
import {Auth, EasybaseProvider} from 'easybase-react';
import ebconfig from './ebconfig';

import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow, faTimes, faPlus, faSearch, faBullseye } from '@fortawesome/free-solid-svg-icons'

import Map from './components/map.react';
import Map2 from './components/map2.react';
import PointForm from './components/point-form.react';

import useRect from './hooks/useRect';

function Content() {
  const {location, setLocation, mapCenter, setMapCenter, point, setPoint, selectedPoint, setSelectedPoint, setEditingPoint} = useContext(AppContext);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [isBeta, setIsBeta] = useState(false);
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
    setPoint({});
    setSelectedPoint();
  }

  function clearPoint() {
    setPoint();
    setSelectedPoint();
    setEditingPoint(false);
  }

  function handleLocation() {
    getLocation();
    setMapCenter();
  }

  return (
    <div className="App" ref={heightRef}>
      {loadingLoc && <div>Loading</div>}
      {location != null && <div className="map">
        {isBeta === true ? (
          <Map2
            height={height}
          />
        ) : (
          <Map
            height={height}
          />
        )}
      </div>}
      <div className={`target ${(point && 'active')} ${selectedPoint != null && 'hide'}`}>
        <div className="vertical"></div>
        <div className="horizontal"></div>
        <div className="circle"></div>
      </div>
      <div className="main">
        <div className="buttons">
          <div
            className="button"
            onClick={(point || selectedPoint != null) ? clearPoint : addPoint}
          >
            <div className={`icon ${(point || selectedPoint != null) && 'rotate'}`}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
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
          <div className={`button beta ${isBeta ? 'selected' : ''}`} onClick={() => setIsBeta(!isBeta)}>
            v2
          </div>
        </div>
        <div className="sheetBox">
          <div className={`sheet ${(point || selectedPoint != null) && 'open'}`}>
            <PointForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <EasybaseProvider ebconfig={ebconfig}>
        <Auth>
          <Content />
        </Auth>
      </EasybaseProvider>
    </AppProvider>
  )
}

export default App;
