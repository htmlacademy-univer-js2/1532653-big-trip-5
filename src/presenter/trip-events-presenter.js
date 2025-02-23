import SortView from '../view/sort-view.js';
import PointAddView from '../view/point-add-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointListView from '../view/point-list-view.js';
import {render} from '../render.js';

export default class TripEventsPresenter {
  tripEventsComponent = new PointListView();

  constructor({tripEventsContainer}) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(new SortView(), this.tripEventsContainer);
    render(this.tripEventsComponent, this.tripEventsContainer);
    render(new PointEditView(), this.tripEventsComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.tripEventsComponent.getElement());
    }

    render(new PointAddView(), this.tripEventsComponent.getElement());
  }
}
