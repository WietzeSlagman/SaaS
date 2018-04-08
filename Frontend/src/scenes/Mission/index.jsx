// var WebSocketClient = require('websocket').client;
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { initMission, setDrones, setFocusedDrone } from 'services/mission/actions';
import { getDrones, getFocusedDrone } from 'services/mission/selectors';
import MissionMap from './components/MissionMap';
import DronesOverview from './components/DronesOverview';
import DroneInfo from './components/DroneInfo';
// import { client } from 'websocket';
import WebSocket from 'isomorphic-ws';
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

const propTypes = {
  // Injected by React Router
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  focusedDrone: PropTypes.string,
  drones: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  focusedDrone: null,
  drones: null,
}

class Mission extends React.PureComponent {
  constructor(props) {
    super(props);
    // props.setDrones(DRONES);
    this.handleDroneClick = this.handleDroneClick.bind(this);
    const ws = new WebSocket('ws://192.168.169.56:9985/api/v1/streams/valid_transactions');
    ws.onopen = function open() {
      console.log('connected');
      ws.send(Date.now());
    };
    ws.onclose = function close() {
      console.log('disconnected');
    };
    ws.onmessage = function incoming(data) {
      console.log(`Roundtrip time: ${Date.now() - data} ms`);

      setTimeout(function timeout() {
        ws.send(Date.now());
      }, 500);
    };
  }

  componentDidMount() {
    // const id = this.props.match.params.id;
    // this.props.initMission({ id });
    // setInterval(() => this.fetchMission(id), 100);
  }

  handleMessage() {

  }

  async fetchMission(id) {
    try {
      const res = await fetch(`http://.../api/retrieveMission`, {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      });
      console.log('retrieved mission', res.json());
      // const drones;
      this.props.setDrones([]);
    } catch (err) {
      console.log(err);
    }
  }

  handleDroneClick(marker) {
    this.props.setFocusedDrone(marker.id);
  }

  render() {
    const { mission, focusedDrone } = this.props;

    if (!mission) {
      return <div>no mission data</div>;
    }

    const drones = mission.drones;

    return (
      <div className="Mission">
        <DronesOverview
          items={groupDrones(drones)}
        />
        {focusedDrone && <DroneInfo {...focusedDrone} />}
        <MissionMap
          gridBounds={DENALI_MISSION.bounds}
          center={DENALI_MISSION.center}
          markers={drones}
          onMarkerClick={this.handleDroneClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mission: state.mission,
    focusedDrone: getFocusedDrone(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initMission: (data) => dispatch(initMission(data)),
    setDrones: (drones) => dispatch(setDrones(drones)),
    setFocusedDrone: (id) => dispatch(setFocusedDrone(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mission);
