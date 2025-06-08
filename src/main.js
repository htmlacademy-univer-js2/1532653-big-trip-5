import {render} from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteContentElement = document.querySelector('.trip-events');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: siteFiltersElement,
  filterModel,
  pointsModel
});
const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});
const tripEventsPresenter = new TripEventsPresenter({
  tripEventsContainer: siteContentElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripEventsPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, siteHeaderElement);

filterPresenter.init();
tripEventsPresenter.init();
