import View from './view';

class PregameView extends View {
  _parentElement = document.querySelector('.pre__game__container');

  _generateMarkup() {
    return `
        <div class="pre__game__info">
          Place your ships along the grid, use the button below to change the
          placement axis!
        </div>
        <button type="button" class="pre__game__button__axis">
          X
        </button>
    `;
  }

  handlePlayGameButton(handler, data) {
    this._parentElement
      .querySelector('.pre__game__button__computer')
      .addEventListener('click', function (e) {
        handler();
      });
    this._parentElement.addEventListener('click', function (e) {
      if (!e.target.closest('.pre__game__button__axis')) return;
      console.log(data);
      data.axis = data.axis === 'X' ? 'Y' : 'X';
      e.target.innerHTML = data.axis;
    });
  }
}

export default new PregameView();
