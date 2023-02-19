import { IS_SUNK, IS_ALIVE, X_AXIS_SIZE, Y_AXIS_SIZE } from '../config';
import { randomInt } from '../helpers';
import gameBoard from './gameBoard';
import { state } from './model';

export default class Ship {
  _size;
  _hits;

  constructor(
    size,
    map = null,
    random = true,
    coords = null,
    directionInput = null
  ) {
    this._size = size;
    this._hits = 0;
    this.determinePos(size, map, random, coords, directionInput);
  }

  determinePos(
    size,
    map = null,
    random = true,
    coords = null,
    directionInput = null
  ) {
    let locationX;
    let locationY;
    let direction;

    if (random) {
      while (true) {
        //Determine direction (0 = Horizontal, 1 = Vertical)
        direction = randomInt(1);
        if (!direction) {
          locationX = randomInt(X_AXIS_SIZE - 1 - size);
          locationY = randomInt(Y_AXIS_SIZE - 1);
        } else {
          locationX = randomInt(X_AXIS_SIZE - 1);
          locationY = randomInt(Y_AXIS_SIZE - 1 - size);
        }

        let unique = true;
        let iterations = 0;
        for (let i = 0; i < size; i++, iterations++) {
          const coords = String(
            (direction === 0 ? locationY : locationY + i) +
              String(direction === 0 ? locationX + i : locationX)
          );

          // More collision checks to get better spacing on board
          const coordsMinusOne = String(
            (direction === 0 ? locationY : locationY + i) -
              1 +
              String((direction === 0 ? locationX + i : locationX) - 1)
          );

          const coordsPlusOne = String(
            (direction === 0 ? locationY : locationY + i) +
              1 +
              String((direction === 0 ? locationX + i : locationX) + 1)
          );

          const coordsPlusMinusOne = String(
            (direction === 0 ? locationY : locationY + i) +
              1 +
              String((direction === 0 ? locationX + i : locationX) - 1)
          );

          const coordsMinusPlusOne = String(
            (direction === 0 ? locationY : locationY + i) -
              1 +
              String((direction === 0 ? locationX + i : locationX) + 1)
          );
          // End of collision checks

          if (
            map.has(coords) ||
            map.has(coordsMinusOne) ||
            map.has(coordsPlusOne) ||
            map.has(coordsPlusMinusOne) ||
            map.has(coordsMinusPlusOne)
          ) {
            unique = false;
            for (let i = 0; i < iterations; i++) {
              const coords = String(
                (direction === 0 ? locationY : locationY + i) +
                  String(direction === 0 ? locationX + i : locationX)
              );
              map.delete(coords);
              state.boardState.computerBoardSlots.splice(
                state.boardState.computerBoardSlots.indexOf(coords),
                1
              );
            }
            break;
          } else {
            map.set(coords, true);
            const tempArr = coords.split('');
            //tempArr[0] = x tempArr[1] = y
            state.boardState.computerBoardSlots.push(tempArr);
          }
        }
        if (unique) break;
      }
    } else {
      direction = directionInput;
      locationX = Number(coords[1]);
      locationY = Number(coords[0]);
      for (let i = 0; i < size; i++) {
        const coords = String(
          (direction === 0 ? locationY : locationY + i) +
            String(direction === 0 ? locationX + i : locationX)
        );
        const tempArr = coords.split('');
        console.log(coords);
        state.boardState.playerBoardSlots.push(tempArr);
      }
    }
    this.locationX = locationX;
    this.locationY = locationY;
    this.direction = direction;
  }

  hit() {
    this._hits++;
    if (this.isSunk()) {
      console.log('SUNK!');
      return IS_SUNK;
    } else {
      return IS_ALIVE;
    }
  }

  isSunk() {
    return this._size <= this._hits;
  }
}
