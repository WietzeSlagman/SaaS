import { chain, groupBy, toPairs, zipObject, value } from 'lodash';

export function groupDrones(drones) {
  return chain(drones)
    .groupBy('type')
    .toPairs()
    .map((currentItem) => {
      return zipObject(['type', 'drones'], currentItem);
    })
    .value();
}