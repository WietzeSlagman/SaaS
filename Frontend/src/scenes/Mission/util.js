import { chain, groupBy, toPairs, zipObject, value } from 'lodash';

export function groupDrones(drones) {
  return chain(drones.toJS())
    .groupBy('action')
    .toPairs()
    .map((currentItem) => {
      return zipObject(['action', 'drones'], currentItem);
    })
    .value();
}