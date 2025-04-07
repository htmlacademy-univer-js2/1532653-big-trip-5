import FilterView from './view/filter-view.js';
import {render} from './framework/render.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';

const siteContentElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: siteContentElement,
  pointsModel,
});
const filters = generateFilter(pointsModel.points);

render(new FilterView({filters}), siteFiltersElement);

tripEventsPresenter.init();
