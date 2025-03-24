import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import {render, replace} from '../framework/render.js';

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #tripEventsComponent = new PointListView();

  #tripEventsPoints = [];

  constructor({tripEventsContainer, pointsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripEventsPoints = [...this.#pointsModel.points];

    this.#renderTripEvents();
  }

  #renderPoint(point, destination, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventComponent = new PointView({
      point,
      destination,
      offers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventEditComponent = new PointEditView({
      point,
      destination,
      offers,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceFormToPoint() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#tripEventsComponent.element);
  }

  #renderTripEvents() {
    render(new SortView(), this.#tripEventsContainer);
    render(this.#tripEventsComponent, this.#tripEventsContainer);

    if (!this.#tripEventsPoints.length) {
      render(new NoPointView(), this.#tripEventsComponent.element);
      return;
    }

    this.#tripEventsPoints.forEach((point) => {
      const destination = this.#pointsModel.getDestination(point);
      const offers = this.#pointsModel.getOffers(point);
      this.#renderPoint(point, destination, offers);
    });

    render(new PointEditView({point: this.#tripEventsPoints[0]}), this.#tripEventsComponent.element);
  }
}
