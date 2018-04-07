import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const getFocusedDroneId = state => state.focusedDrone;
export const getDrones = state => state.drones;

/**
 *
 */
export const getFocusedDrone = createSelector(
  getFocusedDroneId,
  getDrones,
  (focusedDroneId, drones) => {
    if (!focusedDroneId) {
      return undefined;
    }

    return drones.find((drone) => drone.id === focusedDroneId);
  },
);
