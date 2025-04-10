import {render, RenderPosition, replace} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';

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

    render(eventComponent, this.#pointListComponent.element);
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
