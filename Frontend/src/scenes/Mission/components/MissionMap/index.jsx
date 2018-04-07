import React from 'react';
import { compose, withProps } from 'recompose';
import { Rectangle, withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import mapStyle from './mapStyle.json';
import './index.css';

const GRID_STEPS = 100;

function getWorldCoords(gridBounds, gridCoords) {
  const vertStepSize = Math.abs(gridBounds.south - gridBounds.north) / GRID_STEPS;
  const horzStepSize = Math.abs(gridBounds.east - gridBounds.west) / GRID_STEPS;
  return {
    lat: gridBounds.north - (vertStepSize * gridCoords.y),
    lng: gridBounds.west + (horzStepSize * gridCoords.x),
  };
}

function MissionMap(props) {
  const { gridBounds, center, markers } = props;

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={center}
      defaultOptions={{
        styles: mapStyle,
        disableDefaultUI: true,
        controlText: {
          style: {
            fontFamily: 'Stratum2',
          },
        },
      }}
    >
      {markers.map((marker) => {
        const { coords } = marker;
        return (
          <Marker
            key={marker.id}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            position={getWorldCoords(gridBounds, coords)}
          />
        );
      })}
    </GoogleMap>
  );
};

export default compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(MissionMap);
