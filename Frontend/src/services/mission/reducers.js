import { fromJS, List, Map } from 'immutable';
import * as types from './types';

function mission(state = null, action) {
  const { type, id, drones = [], focusedDrone } = action;
  switch (type) {
    case types.INIT_MISSION:
      return {
        id,
        focusedDrone,
        drones,
      };
    case types.SET_FOCUSED_DRONE:
      return {
        ...state,
        focusedDrone,
      };
    case types.SET_DRONES:
      return {
        ...state,
        drones,
      };
    default:
      return state;
  }
}

export default {
  mission,
};
