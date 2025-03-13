import {createElement} from '../render.js';
import {TYPES} from '../const.js';
import {mockDestinations} from '../mock/destinations.js';
import {mockOffers} from '../mock/offers.js';
import {capitalizeFirstLetter, humanizeDate} from '../utils.js';

const BLANK_POINT = {
  price: null,
  dateFrom: null,
  dateTo: null,
  type: 'flight'
};

function createPointEditTypesTemplate(type) {
  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      ${TYPES.map((item) => `<div class="event__type-item">
        <input
          id="event-type-${item}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${item}" ${type === item ? 'checked' : ''}
        >
        <label class="event__type-label  event__type-label--${item}"
          for="event-type-${item}-1"
          >${capitalizeFirstLetter(item)}
        </label>
      </div>`).join('')}
    </fieldset>`
  );
}

function createPointEditDestinationsTemplate(destination) {
  return (
    `<input class="event__input  event__input--destination"
      id="event-destination-1"
      type="text"
      name="event-destination"
      value="${destination.name}"
      list="destination-list-1">
    <datalist id="destination-list-1">
      ${mockDestinations.map((item) => `<option value="${item.name}"></option>`).join('')}
    </datalist>`
  );
}

function createPointEditOffersTemplate(type, offers) {
  return (
    offers.length ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${mockOffers.find((item) => item.type === type).offers.map((item) => `<div class="event__offer-selector">
          <input
            class="event__offer-checkbox  visually-hidden"
            id="${item.id}"
            type="checkbox"
            name="event-offer-luggage" ${offers.some((offer) => offer.id === item.id) ? 'checked' : ''}
          >
          <label class="event__offer-label" for="${item.id}">
            <span class="event__offer-title">${item.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
          </label>
        </div>`).join('')}
      </div>
    </section>` : ''
  );
}

function createPointEditDescriptionTemplate(destination) {
  return (
    destination.description ? `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

      ${destination.pictures.length ? `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.pictures.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`)}
        </div>
      </div>` : ''}
    </section>` : ''
  );
}

function createPointEditTemplate({point, destination, offers}) {
  const {price, dateFrom, dateTo, type} = point;

  const dataFromValue = humanizeDate(dateFrom);
  const dataToValue = humanizeDate(dateTo);
  const typesListTemplate = createPointEditTypesTemplate(type);
  const destinationsListTemplate = createPointEditDestinationsTemplate(destination);
  const offersTemplate = createPointEditOffersTemplate(type, offers);
  const descriptionTemplate = createPointEditDescriptionTemplate(destination);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              ${typesListTemplate}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${capitalizeFirstLetter(type)}
            </label>
            ${destinationsListTemplate}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dataFromValue}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dataToValue}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price ? price : ''}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          ${offersTemplate}

          ${descriptionTemplate}
        </section>
      </form>
    </li>`
  );
}

export default class PointEditView {
  constructor({point = BLANK_POINT, destination, offers}) {
    this.point = point;
    this.destination = destination;
    this.offers = offers;
  }

  getTemplate() {
    return createPointEditTemplate({point: this.point, destination: this.destination, offers: this.offers});
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
