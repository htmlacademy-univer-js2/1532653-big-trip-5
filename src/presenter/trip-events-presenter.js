import {render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();

  #tripEventsPoints = [];
  #pointPresenters = new Map();

  constructor({tripEventsContainer, pointsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripEventsPoints = [...this.#pointsModel.points];

    this.#renderTripEvents();
  }

  #tripEventsDestination = (point) => this.#pointsModel.getDestination(point);
  #tripEventsOffers = (point) => this.#pointsModel.getOffers(point);

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripEventsPoints = updateItem(this.#tripEventsPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      destination: this.#tripEventsDestination(updatedPoint),
      offers: this.#tripEventsOffers(updatedPoint)
    });
  };

  #renderSort() {
    render(this.#sortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGINBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init({
      point,
      destination: this.#tripEventsDestination(point),
      offers: this.#tripEventsOffers(point)
    });
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#tripEventsPoints.forEach((point) => this.#renderPoint(point));
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
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
