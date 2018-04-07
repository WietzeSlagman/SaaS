import React from 'react';
import { connect } from 'react-redux';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { setDrones, setFocusedDrone } from 'services/mission/actions';
import { getFocusedDrone } from 'services/mission/selectors';
import MissionMap from './components/MissionMap';
import DronesOverview from './components/DronesOverview';
import DroneInfo from './components/DroneInfo';
import './index.css';
import DENALI_MISSION from './missions/denali.json';
import { groupDrones } from './util.js';

const DRONES = [
  {
    id: 'adfkasjdfoi4j134124ojslk12oij4321ok312lkajsd',
    type: 'VIDEO',
    battery: '30',
    coords: { x: 0, y: 0 },
  },
  {
    id: '12312093j2130ijdsjkjsd0129j231lk21jl132kj31l2',
    type: 'VIDEO',
    battery: '40',
    coords: { x: 2, y: 5 },
  },
  {
    id: '12312312y3iosjdosdajsadsausad7132123hoi132hoi',
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

class Mission extends React.PureComponent {
  constructor(props) {
    super(props);
    props.setDrones(DRONES);
    this.handleDroneClick = this.handleDroneClick.bind(this);
  }

  handleDroneClick(event, marker) {
    this.props.setFocusedDrone(marker.id);
  }

  render() {
    const { drones, focusedDrone } = this.props;

    return (
      <div className="Mission">
        <DronesOverview
          items={groupDrones(drones)}
        />
        {focusedDrone && <DroneInfo {...focusedDrone} />}
        <MissionMap
          gridBounds={{
            north: 63.269234,
            south: 62.868054,
            east: -150.132029,
            west: -151.983226
          }}
          center={DENALI_MISSION.center}
          markers={drones}
          onMarkerClick={this.handleDroneClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    activeDrone,
    drones,
  } = state;

  return {
    focusedDrone: getFocusedDrone(state),
    drones,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDrones: (drones) => dispatch(setDrones(drones)),
    setFocusedDrone: (id) => dispatch(setFocusedDrone(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mission);
