import { X_AXIS_SIZE, Y_AXIS_SIZE } from '../config';
import { randomInt } from '../helpers';
class GameBoard {
  constructor() {
    this.board = Array.from(Array(X_AXIS_SIZE), () =>
      Array(Y_AXIS_SIZE).fill(0)
    );
  }

  _populateAIBoard() {
    const determinePos = function (size) {
      const direction = randomInt(1);
      const randomIndex = randomInt(10);
    };
    //place carrier

    //place 2 battleships
    //place 3 destroyers
    //place 3 submarine
    //place 5 patrol ships
  }
}

export default new GameBoard();
