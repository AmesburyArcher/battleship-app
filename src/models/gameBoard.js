import { X_AXIS_SIZE, Y_AXIS_SIZE } from '../config';
import { randomInt } from '../helpers';
import Ship from './ship';

class GameBoard {
  coveredFields = [];

  constructor() {
    this.board = Array.from(Array(X_AXIS_SIZE), () =>
      Array(Y_AXIS_SIZE).fill({
        hit: 0,
        occupied: null,
      })
    );
    console.log(this.board);
    this._populateAIBoard(this.board);
  }

  _populateAIBoard(board) {
    const popCells = function (ship) {
      console.log(ship);

      if (ship.direction === 0) {
        for (let i = 0; i < ship._size; i++) {
          board[ship.locationY][ship.locationX + i].occupied = ship;
        }
      } else {
        for (let i = ship.locationX; i < ship.locationX + ship._size; i++) {
          board[ship.locationY + i][ship.locationX].occupied = ship;
        }
      }
    };
    //place carrier
    const carrier = new Ship(5);
    popCells(carrier);

    //place 2 battleships
    //place 3 destroyers
    //place 3 submarine
    //place 4 patrol ships
  }
}

export default new GameBoard();
