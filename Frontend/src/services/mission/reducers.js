import { fromJS, List, Map } from 'immutable';
import * as types from './types';

function focusedDrone(state = null, action) {
  const { type, id } = action;
  switch (type) {
    case types.SET_FOCUSED_DRONE:
      return id;
    default:
      return state;
  }
}

function drones(state = [], action) {
  const { type, drones } = action;
  switch (type) {
    case types.SET_DRONES:
      return drones;
    default:
      return state;
  }
}

export default {
  focusedDrone,
  drones,
};
