import View from './view';
import { X_AXIS_SIZE, Y_AXIS_SIZE } from '../config';

class GameBoardView extends View {
  _parentElement = document.querySelector('.game__board__container');
  _otherData;

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

  handleUserShipPlacements(handler, data) {
    const board = this._parentElement.querySelector('[data-userType="user"]');
    this._otherData = data;
    const that = this;

    const eventFunc = function (e) {
      if (that._otherData.userState.shipsLeftToPlace.total <= 0) return;
      const cell = e.target;
      let size;

      if (that._otherData.userState.currentPlacement === 'carrier') size = 5;
      if (that._otherData.userState.currentPlacement === 'battleship') size = 4;
      if (that._otherData.userState.currentPlacement === 'destroyer') size = 3;
      if (that._otherData.userState.currentPlacement === 'patrol') size = 2;

      const x = cell.dataset.row;
      const y = cell.dataset.col;
      if (that._otherData.userState.axis === 'X') {
        if (size === 5 && cell.dataset.col >= 6) return;
        if (size === 4 && cell.dataset.col >= 7) return;
        if (size === 3 && cell.dataset.col >= 8) return;
        if (size === 2 && cell.dataset.col >= 9) return;
        for (let i = 0; i < size; i++) {
          const yNum = Number(y) + i;
          const check = x + String(yNum);
          console.log(check);

          if (that._otherData.boardState.playerBoardSlots.includes(check)) {
            console.log('REPEAT');
            return;
          }
        }
        for (let i = 0; i < size; i++) {
          const cell = board.querySelector(
            `[data-row="${x}"][data-col="${+y + i}"]`
          );
          cell.style.backgroundColor = 'pink';
        }
      }
      if (that._otherData.userState.axis === 'Y') {
        if (size === 5 && cell.dataset.row >= 6) return;
        if (size === 4 && cell.dataset.row >= 7) return;
        if (size === 3 && cell.dataset.row >= 8) return;
        if (size === 2 && cell.dataset.row >= 9) return;
        for (let i = 0; i < size; i++) {
          const xNum = Number(x) + i;
          const check = String(xNum) + y;
          console.log(check);

          if (that._otherData.boardState.playerBoardSlots.includes(check)) {
            console.log('REPEAT');
            return;
          }
        }
        for (let i = 0; i < size; i++) {
          const cell = board.querySelector(
            `[data-row="${+x + i}"][data-col="${y}"]`
          );
          cell.style.backgroundColor = 'pink';
        }
      }

      handler(x, y);
    };

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
