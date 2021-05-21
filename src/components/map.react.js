import ReactMap, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Mapbox = ReactMap({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

export default function Map({location, height}) {
  if (location == null) return null;
  console.log('LOCATION', location)
  // const {center, locator, height} = location;
  const zoom = [10];
  // const reversedCenter = [center[1], center[0]];
  // const reversedMarkerCoord = locator ? [locator.Longitude, locator.Latitude] : null;

  // const fit = locator != null ? [reversedCenter, reversedMarkerCoord] : [reversedCenter, reversedCenter];
  const pad = 45;
  const topPad = height + pad;

  const center = [
    location.coords.longitude,
    location.coords.latitude,
  ];

  return (
    <Mapbox
      // eslint-disable-next-line
      style="mapbox://styles/mapbox/dark-v10?optimize=true"
      containerStyle={{
        height: '100%',
        width: '100%'
      }}
      center={center}
      // fitBounds={[
      //   location.coords.latitude,
      //   location.coords.longitude
      // ]}
      // fitBoundsOptions={{
      //   maxZoom: zoom,
      //   padding: {top: topPad, bottom: pad, left: pad, right: pad}
      //   }}
    >
      <Layer type="symbol" id="stop" layout={{ 'icon-image': 'bus' }}>
        <Feature coordinates={center} draggable={true} />
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