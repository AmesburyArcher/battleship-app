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
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-axis-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 13v.01"></path>
            <path d="M4 9v.01"></path>
            <path d="M4 5v.01"></path>
            <path d="M17 20l3 -3l-3 -3"></path>
            <path d="M4 17h16"></path>
          </svg>
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
      data.axis = data.axis === 'X' ? 'Y' : 'X';
      e.target.innerHTML =
        data.axis === 'X'
          ? `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-axis-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 13v.01"></path>
          <path d="M4 9v.01"></path>
          <path d="M4 5v.01"></path>
          <path d="M17 20l3 -3l-3 -3"></path>
          <path d="M4 17h16"></path>
        </svg>
      `
          : `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-axis-y" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M11 20h-.01"></path>
          <path d="M15 20h-.01"></path>
          <path d="M19 20h-.01"></path>
          <path d="M4 7l3 -3l3 3"></path>
          <path d="M7 20v-16"></path>
       </svg>
      `;
    });
  }
}

export default new PregameView();
