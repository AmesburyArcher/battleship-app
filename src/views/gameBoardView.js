import View from './view';
import { X_AXIS_SIZE, Y_AXIS_SIZE } from '../config';

class GameBoardView extends View {
  _parentElement = document.querySelector('.game__board__container');

  _generateMarkup() {
    let markup = '';
    for (let x = 0; x < 2; x++) {
      let gameBoard = `<div class="game__board" data-userType ="${
        x === 0 ? 'user' : 'computer'
      }">`;

      for (let i = 0; i < X_AXIS_SIZE; i++) {
        let row = `<div class="game__board__row" data-row="${i}">`;
        for (let j = 0; j < Y_AXIS_SIZE; j++) {
          let gameCell = `
            <div class="game__board__cell" data-row="${i}" data-col="${j}"></div>
        `;
          row += gameCell;
        }
        row += `</div>`;
        gameBoard += row;
      }
      gameBoard += '</div>';
      markup += gameBoard;
    }
    return markup;
  }

  _handleShipPlacements() {
    const board = this._parentElement.querySelector(
      '[data-userType="computer"]'
    );

    this._data.computerBoardSlots.forEach(coord => {
      const [x, y] = coord;
      const cell = board.querySelector(`[data-row="${x}"][data-col="${y}"]`);
      cell.style.backgroundColor = 'pink';
    });
  }

  handleUserShipPlacements() {
    const board = this._parentElement.querySelector('[data-userType="user"]');

    const eventFunc = function (e) {};

    board.addEventListener('click', eventFunc);
  }

  handleAttacks(handler, data) {
    this._parentElement.addEventListener('click', function (e) {
      if (!e.target.closest('.game__board__cell')) return;
      if (e.target.parentNode.parentNode.dataset.usertype === 'user') return;
      const xCoords = e.target.dataset.row;
      const yCoords = e.target.dataset.col;

      if (data.includes(xCoords + yCoords)) {
        console.log('ALREADY HIT');
        return;
      }

      const status = handler(xCoords, yCoords);

      if (!status) {
        e.target.style.backgroundColor = 'green';
      }
      if (status) {
        e.target.style.backgroundColor = 'red';
      }
    });
  }
}

export default new GameBoardView();
