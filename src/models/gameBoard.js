import { X_AXIS_SIZE, Y_AXIS_SIZE } from '../config';
import { randomInt } from '../helpers';
import Ship from './ship';
import { state } from './model';
import { clone, cloneDeep } from 'lodash';

class GameBoard {
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
    this.boardComputer = cloneDeep(tempArr);
    this.boardUser = cloneDeep(tempArr);

    this._populateAIBoard();
  }

  popCells(ship) {
    if (ship.direction === 0) {
      for (let i = 0; i < ship._size; i++) {
        this.boardComputer[ship.locationY][ship.locationX + i].occupied = ship;
      }
    } else {
      for (let i = 0; i < ship._size; i++) {
        this.boardComputer[ship.locationY + i][ship.locationX].occupied = ship;
      }
    }
  }
  _populateAIBoard() {
    const shipPlacements = new Map();
    //place carrier
    const carrier = new Ship(5, shipPlacements);
    state.boardState.computerShips.push(carrier);
    this.popCells(carrier);

    //place 2 battleships
    for (let i = 0; i < 2; i++) {
      const battleship = new Ship(4, shipPlacements);
      state.boardState.computerShips.push(battleship);
      this.popCells(battleship);
    }
    //place 3 destroyers
    for (let i = 0; i < 3; i++) {
      const destroyer = new Ship(3, shipPlacements);
      state.boardState.computerShips.push(destroyer);
      this.popCells(destroyer);
    }
    //place 4 patrol ships
    for (let i = 0; i < 4; i++) {
      const patrol = new Ship(2, shipPlacements);
      state.boardState.computerShips.push(patrol);
      this.popCells(patrol);
    }
  }
}

export default new GameBoard();
