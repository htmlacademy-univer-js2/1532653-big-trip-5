import {render} from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import DataApiService from './data-api-service.js';

const AUTHORIZATION = 'Basic abracadabra69';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const siteHeaderElement = document.querySelector('.trip-main');
const siteContentElement = document.querySelector('.trip-events');
const siteFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const dataApiService = new DataApiService(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel({pointsApiService: dataApiService});
const destinationsModel = new DestinationsModel({destinationsApiService: dataApiService});
const offersModel = new OffersModel({offersApiService: dataApiService});
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

async function initData() {
  await destinationsModel.init();
  await offersModel.init();
  await pointsModel.init();
  render(newPointButtonComponent, siteHeaderElement);
}

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripEventsPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filterPresenter.init();
tripEventsPresenter.init();
initData();
