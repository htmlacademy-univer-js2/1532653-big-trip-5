import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDay, humanizeTime, getTimeDuration, getPointDestination, getPointOffers} from '../utils/point.js';

function createPointOffersTemplate(offers) {
  return (
    offers.length ? `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offers.map((item) => `<li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
      </li>`).join('')}
    </ul>` : ''
  );
}

function createPointTemplate({point, destinations, offers}) {
  const {price, dateFrom, dateTo, isFavorite, type} = point;
  const pointDestination = getPointDestination(point, destinations);
  const pointOffers = getPointOffers(point, offers);
  const {name: city} = pointDestination;

  const date = humanizeDay(dateFrom).toUpperCase();
  const eventDuration = getTimeDuration(dateFrom, dateTo);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  const offersTemplate = createPointOffersTemplate(pointOffers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom.slice(0, 10)}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom.slice(0, 16)}">${humanizeTime(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo.slice(0, 16)}">${humanizeTime(dateTo)}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        ${offersTemplate}
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({point, destinations, offers, onEditClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate({point: this.#point, destinations: this.#destinations, offers: this.#offers});
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
