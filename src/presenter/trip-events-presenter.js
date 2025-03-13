import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointListView from '../view/point-list-view.js';
import {render} from '../render.js';

export default class TripEventsPresenter {
  tripEventsComponent = new PointListView();

  constructor({tripEventsContainer, pointsModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripEventsPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.tripEventsContainer);
    render(this.tripEventsComponent, this.tripEventsContainer);
    render(new PointEditView({point: this.tripEventsPoints[0], destination: this.pointsModel.getDestination(this.tripEventsPoints[0]), offers: this.pointsModel.getOffers(this.tripEventsPoints[0])}), this.tripEventsComponent.getElement());

    for (let i = 1; i < this.tripEventsPoints.length; i++) {
      const destination = this.pointsModel.getDestination(this.tripEventsPoints[i]);
      const offers = this.pointsModel.getOffers(this.tripEventsPoints[i]);
      render(new PointView({point: this.tripEventsPoints[i], destination, offers}), this.tripEventsComponent.getElement());
    }

    render(new PointEditView({point: this.tripEventsPoints[0]}), this.tripEventsComponent.getElement());
  }
}
