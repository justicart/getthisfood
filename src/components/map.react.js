import ReactMap, { Layer, Feature } from 'react-mapbox-gl';
import {useContext, useState} from 'react';
import {AppContext} from '../contexts/AppContext';
import 'mapbox-gl/dist/mapbox-gl.css';

const Mapbox = ReactMap({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

export default function Map({height}) {
  const [movingPoing, setMovingPoint] = useState(false);
  const {location, mapCenter, setMapCenter, mapZoom, setMapZoom, point, points, selectedPoint, setSelectedPoint} = useContext(AppContext);
  if (location == null) return null;

  const handleMapMoved = (e) => {
    if (!movingPoing) {
      const newCenter = e.transform && e.transform._center;
      if (newCenter) {
        return setMapCenter([newCenter.lng, newCenter.lat]);
      }
    }
  }
  const handleMapZoomed = (e) => {
    const newZoom = e.transform && e.transform._zoom;
    if (newZoom) {
      return setMapZoom([newZoom]);
    }
  }
  const onDragPoint = () => {
    setMovingPoint(true);
  }
  const onDragPointEnd = (e) => {
    setMovingPoint(false);
  }

  const openPointDetails = (data) => {
    console.log(data.feature.properties.id, point, selectedPoint);
    if (!point && selectedPoint == null) {
      setSelectedPoint(data.feature.properties.id)
    }
  }

  // const {center, locator, height} = location;
  // const reversedCenter = [center[1], center[0]];
  // const reversedMarkerCoord = locator ? [locator.Longitude, locator.Latitude] : null;

  // const fit = locator != null ? [reversedCenter, reversedMarkerCoord] : [reversedCenter, reversedCenter];
  const pad = 45;
  const topPad = height + pad;

  const mapMoved = mapCenter && location !== mapCenter;
  const center = mapMoved ? mapCenter : location;

  return (
    <Mapbox
      // eslint-disable-next-line
      style="mapbox://styles/mapbox/dark-v10?optimize=true"
      containerStyle={{
        height: '100%',
        width: '100%'
      }}
      center={center}
      // center={[-73.945407, 40.7783245]}
      zoom={mapZoom}
      // fitBounds={[
      //   location.coords.latitude,
      //   location.coords.longitude
      // ]}
      // fitBoundsOptions={{
      //   maxZoom: zoom,
      //   padding: {top: topPad, bottom: pad, left: pad, right: pad}
      //   }}
      onDragEnd={handleMapMoved}
      onZoomEnd={handleMapZoomed}
    >
      <Layer
        type="circle"
        id="point"
        paint={{"circle-radius": 15, "circle-color": "#00a2ff"}}
        layout={{visibility: point != null ? 'visible' : 'none'}}
      >
        {/* // TODO dragging doesn't work */}
        <Feature coordinates={point ? point.coords : center} draggable={true} onDrag={onDragPoint} onDragEnd={onDragPointEnd} />
      </Layer>
      <Layer
        type="circle"
        id="points"
        paint={{"circle-radius": 5, "circle-color": "#00a2ff"}}
      >
        {points.map((savedPoint, index) => {
          return <Feature key={index} coordinates={savedPoint.coords} onClick={openPointDetails} id={index} />
        })}
      </Layer>
      {/* <Layer
        type="symbol"
        id="bus"
        layout={{ 
          'icon-image': 'bus', 
          visibility: locator != null ? 'visible' : 'none' 
        }}
        // paint={{
        //   'icon-color': '#FF0000'
        // }}
      >
        <Feature coordinates={reversedMarkerCoord} />
      </Layer> */}
    </Mapbox>
  )
}