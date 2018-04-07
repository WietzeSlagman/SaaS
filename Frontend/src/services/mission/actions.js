import * as types from './types';

export function initMission(data) {
  return { type: types.INIT_MISSION, ...data };
}

export function setFocusedDrone(focusedDrone) {
  return { type: types.SET_FOCUSED_DRONE, focusedDrone };
}

export function setDrones(drones) {
  return { type: types.SET_DRONES, drones };
}
