import React from 'react';
import MissionMap from './components/MissionMap';
import DronesOverview from './components/DronesOverview';
import './index.css';
import DENALI_MISSION from './missions/denali.json';

const DRONES = [
  {
    id: '12412joijasdioj2',
    type: 'VIDEO',
    battery: '30',
    coords: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'VIDEO',
    battery: '40',
    coords: { x: 2, y: 5 },
  },
  {
    id: '3',
    type: 'VIDEO',
    battery: '90',
    coords: { x: 10, y: 30 },
  },
  {
    id: '4',
    type: 'WORKER',
    battery: '12',
    coords: { x: 1, y: 9 },
  },
  {
    id: '5',
    type: 'WORKER',
    battery: '41',
    coords: { x: 9, y: 4 },
  },
  {
    id: '6',
    type: 'WORKER',
    battery: '30',
    coords: { x: 11, y: 3 },
  },
  {
    id: '7',
    type: 'WORKER',
    battery: '30',
    coords: { x: 88, y: 43 },
  },
  {
    id: '8',
    type: 'WORKER',
    battery: '30',
    coords: { x: 19, y: 14 },
  },
];

class Mission extends React.Component {
  render() {
    return (
      <div className="Mission">
        <DronesOverview
          items={DRONES}
        />
        <MissionMap
          gridBounds={{
            north: 63.269234,
            south: 62.868054,
            east: -150.132029,
            west: -151.983226
          }}
          center={DENALI_MISSION.center}
          markers={DRONES}
        />
      </div>
    );
  }
}

export default Mission;
