import {useEffect, useState} from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'

import Map from './components/map.react';

import useRect from './hooks/useRect';

function App() {
  const [location, setLocation] = useState();
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [box, heightRef] = useRect();
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    console.log('GET')
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(setLocationFromPosition);
  }

  const setLocationFromPosition = (position) => {
    console.log('POSITION', position);
    setLocation(position);
    setLoadingLoc(false);
  }

  const height = box.height || 300;

  return (
    <div className="App" ref={heightRef}>
      {loadingLoc && <div>Loading</div>}
      {location != null && <div className="map">
        <Map
          location={location}
          height={height}
        />
      </div>}
      <div className="buttons">
        <div className="button">
          <div className="icon">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <div className="button">
          <div className="icon">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        <div className="button">
          <div className="icon">
            <FontAwesomeIcon icon={faLocationArrow} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
