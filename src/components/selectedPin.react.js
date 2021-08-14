import * as React from 'react';
import {Marker} from 'react-map-gl';

import {SIZE} from '../constants';

function SelectedPin(props) {
  const {points, selectedPoint, closePointDetails} = props;

  const point = points[selectedPoint];

  return (
    <Marker longitude={point.coords[0]} latitude={point.coords[1]}>
      <svg
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          cursor: 'pointer',
          fill: 'none',
          stroke: '#d00',
          strokeWidth: 2,
          transform: `translate(${-SIZE / 2}px,${-SIZE / 2}px)`
        }}
        onClick={closePointDetails}
      >
        <circle cx={SIZE / 2} cy={SIZE / 2} r={15}/>
      </svg>
    </Marker>
  );
}

export default React.memo(SelectedPin);