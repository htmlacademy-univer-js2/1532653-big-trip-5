import {remove, render, RenderPosition} from '../framework/render.js';
import NewPointView from '../view/new-point-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #destinationsModel = null;
  #offersModel = null;
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #destinations = null;
  #offers = null;
  #pointAddComponent = null;

  constructor({destinationsModel, offersModel, pointListContainer, onDataChange, onDestroy}) {
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;

    if (this.#pointAddComponent !== null) {
      return;
    }

    this.#pointAddComponent = new NewPointView({
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#pointAddComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointAddComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointAddComponent);
    this.#pointAddComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointAddComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointAddComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#pointAddComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
