class GameMessageView {
  _parentElement = document.querySelector('.game__messages');

  render(win, user, hit) {
    this.clear();

    const markup = this._generateMarkup(win, user, hit);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup(win, user, hit) {
    if (win === null && user === null && hit === null) {
      return `
        <div class="status__message">
          Fire your first shot!
        </div>
      `;
    }
    if (win) {
      return `
            <div class="status__message">
                ${user} has won the game!
            </div>
            <button class="reset__button" onClick="window.location.reload();">Reset Game</button>
        `;
    } else {
      return `
            <div class="status__message">
                ${user} has ${hit} a ship!
            </div>
        `;
    }
  }
}

export default new GameMessageView();
