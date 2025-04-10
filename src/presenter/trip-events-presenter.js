import {render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();

  #tripEventsPoints = [];

  constructor({tripEventsContainer, pointsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripEventsPoints = [...this.#pointsModel.points];

    this.#renderTripEvents();
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGINBEGIN);
  }

  #renderPoint(point, destination, offers) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
    });

    pointPresenter.init(point, destination, offers);
  }

  #renderPoints() {
    this.#tripEventsPoints.forEach((point) => {
      const destination = this.#pointsModel.getDestination(point);
      const offers = this.#pointsModel.getOffers(point);
      this.#renderPoint(point, destination, offers);
    });
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#tripEventsContainer);
  }

  #renderPointsList() {
    render(this.#pointListComponent, this.#tripEventsContainer);
    this.#renderPoints();
  }

  #renderTripEvents() {
    if (!this.#tripEventsPoints.length) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }
}
