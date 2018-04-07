import * as types from './types';

export function setFocusedDrone(id) {
  return { type: types.SET_FOCUSED_DRONE, id };
}

export function setDrones(drones) {
  return { type: types.SET_DRONES, drones };
}
