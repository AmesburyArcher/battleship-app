import gameBoard from './gameBoard';
import Ship from './ship';

export const state = {
  boardState: {
    computerShips: [],
    computerBoardSlots: [],
    playerShips: [],
    playerBoardSlots: [],
    attackedCells: [],
  },
};

export const fireShot = function (x, y) {
  const target = gameBoard.board[x][y].occupied;
  state.boardState.attackedCells.push(String(x) + String(y));

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

export const checkWin = function (userType) {
  if (userType === 'player') {
    return state.boardState.playerShips.every(ship => ship.isSunk());
  }
  if (userType === 'computer') {
    return state.boardState.computerShips.every(ship => ship.isSunk());
  }
};
