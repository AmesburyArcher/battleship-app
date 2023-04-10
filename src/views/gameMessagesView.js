class GameMessageView {
  _parentElement = document.querySelector('.game__messages');

  render(win, user, hit) {
    this.clear();

    const markup = this._generateMarkup(win, user, hit);
    console.log('reached');
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup(win, user, hit) {
    if (win) {
      return `
            <div class="status__message">
                ${user} has won the game!
            </div>
            <button onClick="window.location.reload();">Reset Game</button>
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
