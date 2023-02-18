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
  userState: {
    shipsLeftToPlace: {
      carrier: 1,
      battleship: 2,
      destroyer: 3,
      patrol: 4,
    },
    axis: 'X',
  },
};

export const fireShot = function (x, y) {
  const target = gameBoard.boardComputer[x][y].occupied;
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

export const placeUserShip = function (x, y, size) {
  const ship = new Ship(size);
  ship.determinePos(
    size,
    _,
    false,
    [x, y],
    state.userState.axis === 'X' ? 0 : 1
  );
  boardState.playerShips.push(ship);
};
