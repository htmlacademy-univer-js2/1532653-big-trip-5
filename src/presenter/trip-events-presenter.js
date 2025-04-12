import {render, RenderPosition} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import {sortPointTime, sortPointPrice} from '../utils/point.js';
import {SortType} from '../const.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #sortComponent = null;
  #noPointComponent = new NoPointView();

  #tripEventsPoints = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedTripEventsPoints = [];

  constructor({tripEventsContainer, pointsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripEventsPoints = [...this.#pointsModel.points];
    this.#sourcedTripEventsPoints = [...this.#pointsModel.points];

    this.#renderTripEvents();
  }

  #tripEventsDestination = (point) => this.#pointsModel.getDestination(point);
  #tripEventsOffers = (point) => this.#pointsModel.getOffers(point);

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripEventsPoints = updateItem(this.#tripEventsPoints, updatedPoint);
    this.#sourcedTripEventsPoints = updateItem(this.#sourcedTripEventsPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      destination: this.#tripEventsDestination(updatedPoint),
      offers: this.#tripEventsOffers(updatedPoint)
    });
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#tripEventsPoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#tripEventsPoints.sort(sortPointPrice);
        break;
      default:
        this.#tripEventsPoints = [...this.#sourcedTripEventsPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

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
