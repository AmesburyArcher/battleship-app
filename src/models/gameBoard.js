import { X_AXIS_SIZE, Y_AXIS_SIZE } from '../config';
class GameBoard {
  constructor() {
    this.board = Array.from(Array(X_AXIS_SIZE), () =>
      Array(Y_AXIS_SIZE).fill(0)
    );
  }
}

export default new GameBoard();
