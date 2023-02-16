import gameBoard from './gameBoard';
import Ship from './ship';

export const state = {
  boardState: {
    computerShips: [],
    computerBoardSlots: [],
    playerShips: [],
    playerBoardSlots: [],
  },
};

export const fireShot = function (x, y) {
  const target = gameBoard.board[x][y].occupied;
  if (!target) {
    console.log('MISS');
    return 0;
  }
  if (target) {
    const sunk = target.hit();
    console.log('HIT!');
    return sunk;
  }
};
