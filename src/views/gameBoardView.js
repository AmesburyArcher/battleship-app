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
            <div class="game__board__cell" data-col="${j}"></div>
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
}

export default new GameBoardView();
