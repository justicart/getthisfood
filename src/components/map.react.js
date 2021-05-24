import ReactMap, { Layer, Feature } from 'react-mapbox-gl';
import {useContext, useState} from 'react';
import {AppContext} from '../contexts/AppContext';
import 'mapbox-gl/dist/mapbox-gl.css';

const Mapbox = ReactMap({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

export default function Map({height}) {
  const {location, mapCenter, setMapCenter, mapZoom, setMapZoom, point, points, selectedPoint, setSelectedPoint, editingPoint} = useContext(AppContext);
  if (location == null) return null;
  // console.log('points', points)

  const handleMapMoved = (e) => {
    const newCenter = e.transform && e.transform._center;
    if (newCenter) {
      return setMapCenter([newCenter.lng, newCenter.lat]);
    }
  }
  const handleMapZoomed = (e) => {
    const newZoom = e.transform && e.transform._zoom;
    if (newZoom) {
      return setMapZoom([newZoom]);
    }
  }

  const openPointDetails = (data) => {
    if (point || editingPoint) {
      return;
    }
    // console.log(data.feature.properties.id, point, selectedPoint);
    setSelectedPoint(data.feature.properties.id)
  }

  const closePointDetails = () => {
    setSelectedPoint();
  }

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
        id="points"
        paint={{"circle-radius": 10, "circle-opacity": 0.5, "circle-color": "#00a2ff"}}
      >
        {points.map((savedPoint, index) => {
          return <Feature key={index} coordinates={savedPoint.coords} onClick={openPointDetails} id={index} />
        })}
      </Layer>
      <Layer
        type="circle"
        id="selectedPoint"
        paint={{"circle-radius": 15, "circle-opacity": 0, "circle-stroke-color": "#00a2ff", "circle-stroke-width": 2}}
      >
        {selectedPoint != null && <Feature coordinates={points[selectedPoint].coords} onClick={closePointDetails} id="selected" />}
      </Layer>
    </Mapbox>
  )
}