import {getRandomPoint} from '../mock/point.js';
import {mockDestinations} from '../mock/destinations.js';
import {mockOffers} from '../mock/offers.js';

const POINT_COUNT = 9;

export default class PointsModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }

  getDestination(point) {
    return mockDestinations.find((destination) => destination.id === point.destination);
  }

  getOffers(point) {
    const offersType = mockOffers.find((type) => type.type === point.type);
    const offers = offersType.offers;

    return point.offers.map((id) => offers.find((offer) => offer.id === id));
  }
}
