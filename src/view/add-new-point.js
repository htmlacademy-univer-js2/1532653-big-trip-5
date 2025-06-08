import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {TYPES} from '../const.js';
import {capitalizeFirstLetter} from '../utils/common.js';
import {humanizeDate, getPointDestination, getPointOffers, getOffersType} from '../utils/point.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  price: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};

function createAddNewPointTypesTemplate(type) {
  return (
    `<fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      ${TYPES.map((item) => `<div class="event__type-item">
        <input
          id="event-type-${item}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${item}" ${item === type ? 'checked' : ''}
        >
        <label class="event__type-label  event__type-label--${item}"
          for="event-type-${item}-1"
          >${capitalizeFirstLetter(item)}
        </label>
      </div>`).join('')}
    </fieldset>`
  );
}

function createAddNewPointDestinationsTemplate(pointDestination, destinations) {
  return (
    `<input class="event__input  event__input--destination"
      id="event-destination-1"
      type="text"
      name="event-destination"
      value="${pointDestination ? pointDestination.name : ''}"
      list="destination-list-1">
    <datalist id="destination-list-1">
      ${destinations.map((item) => `<option value="${item.name}"></option>`).join('')}
    </datalist>`
  );
}

function createAddNewPointOffersTemplate(offersType, pointOffers) {
  return (
    offersType.length ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersType.map((item) => `<div class="event__offer-selector">
          <input
            class="event__offer-checkbox  visually-hidden"
            id="${item.id}"
            type="checkbox"
            name="event-offer-luggage" ${pointOffers.some((offer) => offer.id === item.id) ? 'checked' : ''}
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

function createAddNewPointDescriptionTemplate(pointDestination) {
  return (
    pointDestination.description ? `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointDestination.description}</p>

      ${pointDestination.pictures.length ? `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${pointDestination.pictures.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`)}
        </div>
      </div>` : ''}
    </section>` : ''
  );
}

function createAddNewPointTemplate({point, destinations, offers}) {
  const {price, dateFrom, dateTo, type} = point;

  const dataFromValue = humanizeDate(dateFrom);
  const dataToValue = humanizeDate(dateTo);
  const pointDestination = point.destination ? getPointDestination(point, destinations) : '';
  const pointOffers = getPointOffers(point, offers);
  const typesListTemplate = createAddNewPointTypesTemplate(type);
  const destinationsListTemplate = createAddNewPointDestinationsTemplate(pointDestination, destinations);
  const offersType = getOffersType(offers, type);
  const offersTemplate = createAddNewPointOffersTemplate(offersType, pointOffers);
  const descriptionTemplate = createAddNewPointDescriptionTemplate(pointDestination);

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
            <input class="event__input  event__input--price" id="event-price-1" type="number" step="1" min="1" name="event-price" value="${price ? price : ''}">
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

export default class AddNewPointView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #datepicker = null;

  constructor({point = BLANK_POINT, destinations, offers, onFormSubmit, onDeleteClick}) {
    super();
    this._setState(point);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createAddNewPointTemplate({point: this._state, destinations: this.#destinations, offers: this.#offers});
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset(point) {
    this.updateElement(point);
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeRadioHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationOptionHandler);
    if (getOffersType(this.#offers, this._state.type).length) {
      this.element.querySelector('.event__available-offers')
        .addEventListener('change', this.#offersChangeHandler);
    }

    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  #typeRadioHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationOptionHandler = (evt) => {
    evt.preventDefault();

    const destinationsList = this.#destinations.map((item) => item.name);

    if (destinationsList.some((item) => item === evt.target.value)) {
      const updatedDestination = this.#destinations.find((item) => item.name === evt.target.value);

      if (updatedDestination.description) {
        this.updateElement({
          destination: updatedDestination.id,
        });
      }
    }
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate.toISOString(),
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate.toISOString(),
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();

    const offerId = evt.target.id;
    const isChecked = evt.target.checked;

    let updatedOffers = [...this._state.offers];

    if (isChecked) {
      if (!updatedOffers.includes(offerId)) {
        updatedOffers.push(offerId);
      }
    } else {
      updatedOffers = updatedOffers.filter((id) => id !== offerId);
    }

    this._setState({
      offers: updatedOffers,
    });
  };

  #setDatepickerStart() {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        altInput: true,
        altFormat: 'd/m/Y H:i',
        dateFormat: 'Z',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
  }

  #setDatepickerEnd() {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        altInput: true,
        altFormat: 'd/m/Y H:i',
        dateFormat: 'Z',
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(this._state);
  };
}
