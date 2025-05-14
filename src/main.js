import FilterView from './view/filter-view.js';
import {render} from './framework/render.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import {generateFilter} from './mock/filter.js';

const siteContentElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: siteContentElement,
  pointsModel,
  destinationsModel,
  offersModel,
});
const filters = generateFilter(pointsModel.points);

render(new FilterView({filters}), siteFiltersElement);

tripEventsPresenter.init();
