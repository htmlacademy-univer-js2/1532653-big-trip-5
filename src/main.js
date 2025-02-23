import FilterView from './view/filter-view.js';
import {render} from './render.js';
import TripEventsPresenter from './presenter/trip-events-presenter.js';

const siteContentElement = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsPresenter = new TripEventsPresenter({tripEventsContainer: siteContentElement});

render(new FilterView(), siteFiltersElement);

tripEventsPresenter.init();
