import { IS_SUNK, IS_ALIVE, X_AXIS_SIZE, Y_AXIS_SIZE } from '../config';
import { randomInt } from '../helpers';
import gameBoard from './gameBoard';

export default class Ship {
  _size;
  _hits;

  constructor(size, map) {
    this._size = size;
    this._hits = 0;
    this.determinePos(size, map);
  }

  determinePos(size, map, random = true, coords = null, directionInput = null) {
    let locationX;
    let locationY;
    let direction;
    while (true) {
      if (random) {
        //Determine direction (0 = Horizontal, 1 = Vertical)
        direction = randomInt(1);
        if (!direction) {
          locationX = randomInt(X_AXIS_SIZE - 2 - size);
          locationY = randomInt(Y_AXIS_SIZE - 2);
        } else {
          locationX = randomInt(X_AXIS_SIZE - 2);
          locationY = randomInt(Y_AXIS_SIZE - 2 - size);
        }
      } else {
        direction = directionInput;
        locationX = coords[0];
        locationY = coords[1];
      }
      let unique = true;
      let iterations = 0;
      for (let i = 0; i < size; i++, iterations++) {
        let coords = String(
          (direction === 0 ? locationY : locationY + i) +
            String(direction === 0 ? locationX + i : locationX)
        );
        if (map.has(coords)) {
          unique = false;
          for (let i = 0; i < iterations; i++) {
            map.delete(
              String(direction === 0 ? locationY : locationY + i) +
                String(direction === 0 ? locationX + i : locationX)
            );
          }
          break;
        } else {
          map.set(coords, true);
        }
      }
      if (unique) break;
    }
    this.locationX = locationX;
    this.locationY = locationY;
    this.direction = direction;
  }

  hit() {
    this._hits++;
    if (this.isSunk()) {
      return IS_SUNK;
    } else {
      return IS_ALIVE;
    }
  }

  isSunk() {
    return this._size > this._hits;
  }
}
