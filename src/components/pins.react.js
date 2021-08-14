import * as React from 'react';
import {useEasybase} from 'easybase-react';
import {useEffect} from 'react';
import {Marker} from 'react-map-gl';

import {SIZE} from '../constants';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function Pins(props) {
  const { Frame, sync, configureFrame } = useEasybase();

  useEffect(() => {
    configureFrame({ tableName: "NOTES APP", limit: 10 });
    sync();
  }, []);
  const {points, openPointDetails} = props;

  return Frame().map((point, index) => {
    return (
      <Marker key={`marker-${index}`} longitude={point.coords[1]} latitude={point.coords[0]}>
        <svg
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{
            cursor: 'pointer',
            fill: 'rgba(255,0,0,0.4)',
            stroke: 'none',
            transform: `translate(${-SIZE / 2}px,${-SIZE / 2}px)`
          }}
          onClick={() => openPointDetails(index)}
        >
          <circle cx={SIZE / 2} cy={SIZE / 2} r={10}/>
        </svg>
      </Marker>
    )
  });
}

export default React.memo(Pins);