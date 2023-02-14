import { X_AXIS_SIZE, Y_AXIS_SIZE } from '../config';
import { randomInt } from '../helpers';
import Ship from './ship';

class GameBoard {
  coveredFields = [];

  constructor() {
    const tempArr = [];
    for (let row = 0; row < X_AXIS_SIZE; row++) {
      tempArr.push([]);
      for (let col = 0; col < Y_AXIS_SIZE; col++) {
        tempArr[row].push({
          hit: 0,
          occupied: null,
        });
      }
    }
    this.board = tempArr;
    console.log(this.board);
    this._populateAIBoard();
  }

  popCells(ship) {
    if (ship.direction === 0) {
      for (let i = 0; i < ship._size; i++) {
        this.board[ship.locationY][ship.locationX + i].occupied = ship;
      }
    } else {
      for (let i = 0; i < ship._size; i++) {
        this.board[ship.locationY + i][ship.locationX].occupied = ship;
      }
    }
  }
  _populateAIBoard() {
    const shipPlacements = new Map();
    //place carrier
    const carrier = new Ship(5, shipPlacements);
    this.popCells(carrier);

    //place 2 battleships
    for (let i = 0; i < 2; i++) {
      const battleship = new Ship(4, shipPlacements);
      this.popCells(battleship);
    }
    //place 3 destroyers
    for (let i = 0; i < 3; i++) {
      const destroyer = new Ship(3, shipPlacements);
      this.popCells(destroyer);
    }
    //place 4 patrol ships
    for (let i = 0; i < 4; i++) {
      const patrol = new Ship(2, shipPlacements);
      this.popCells(patrol);
    }
    console.log(shipPlacements);
  }
}

export default new GameBoard();
