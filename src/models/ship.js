import { IS_SUNK, IS_ALIVE } from '../config';

class Ship {
  _size;
  _hits;
  _status;
  _shipCoords;

  constructor(size, coords) {
    this._size = size;
    this._hits = 0;
    this._status = 'alive';
    this._shipCoords = coords;
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
