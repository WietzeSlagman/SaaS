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
    percentage: 10
  },
  {
    id: '12312093j2130ijdsjkjsd0129j231lk21jl132kj31l2',
    type: 'VIDEO',
    battery: '40',
    coords: { x: 2, y: 5 },
    percentage: 20
  },
  {
    id: '12312312y3iosjdosdajsadsausad7132123hoi132hoi',
    type: 'VIDEO',
    battery: '90',
    coords: { x: 10, y: 30 },
    percentage: 40
  },
  {
    id: '124f8su9sad8213jj1k23lj123kl123j98123j123123',
    type: 'WORKER',
    battery: '12',
    coords: { x: 1, y: 9 },
    percentage: 60
  },
  {
    id: '1231293012j03k1l23j12o3129831j23k12n3lk12312',
    type: 'WORKER',
    battery: '41',
    coords: { x: 9, y: 4 },
    percentage: 25
  },
  {
    id: '123123jo1i2n3kl12n312983y123k12n3n123123123123',
    type: 'WORKER',
    battery: '30',
    coords: { x: 11, y: 3 },
    percentage: 63
  },
  {
    id: '123oh1238123hio12312klh3123y12hi31n2k3h1203123',
    type: 'WORKER',
    battery: '30',
    coords: { x: 88, y: 43 },
    percentage: 74
  },
  {
    id: '123j12931u2ui12nk3n12o3ih12io3kn123n12lk31o2kn',
    type: 'WORKER',
    battery: '30',
    coords: { x: 19, y: 14 },
    percentage: 56
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
