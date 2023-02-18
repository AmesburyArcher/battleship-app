import View from './view';

class PregameView extends View {
  _parentElement = document.querySelector('.pre__game__container');

  _generateMarkup() {
    return `
        <div class="pre__game__info">
          Place your ships along the grid, use the button below to change the
          placement axis!
        </div>
        <button type="button" class="pre__game__button__axis" data-axis="X">
          X
        </button>
    `;
  }

  handlePlayGameButton(handler) {
    this._parentElement
      .querySelector('.pre__game__button__computer')
      .addEventListener('click', function (e) {
        handler();
      });
  }
}

export default new PregameView();
