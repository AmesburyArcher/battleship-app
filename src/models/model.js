import gameBoard from './gameBoard';
import Ship from './ship';
import { randomInt } from '../helpers';

export const state = {
  boardState: {
    computerShips: [],
    computerBoardSlots: [],
    playerShips: [],
    playerBoardSlots: [],
    attackedCells: [],
    computerAttackedCells: [],
    currentTurn: 'player',
    gameOver: false,
  },
  userState: {
    shipsLeftToPlace: {
      total: 10,
      carrier: 1,
      battleship: 2,
      destroyer: 3,
      patrol: 4,
    },
    axis: 'X',
    currentPlacement: 'carrier',
  },

  computerState: {
    randomAttack: true,
  },
};

export const fireShot = function (x, y) {
  if (state.boardState.currentTurn === 'computer' || state.boardState.gameOver)
    return;
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

export const computerAttack = function () {
  let xVal;
  let yVal;

  if (state.computerState.randomAttack) {
    let flag = true;
    while (flag) {
      xVal = randomInt(9);
      yVal = randomInt(9);
      if (
        !state.boardState.computerAttackedCells.includes(
          String(xVal) + String(yVal)
        )
      )
        flag = false;
    }
  } else {
    const coords = state.computerState.possibleAttacks.pop();
    xVal = coords[0];
    yVal = coords[1];
    if (state.computerState.possibleAttacks.isEmpty())
      state.computerState.randomAttack = true;
  }
  const target = gameBoard.boardUser[xVal][yVal];
  state.boardState.computerAttackedCells.push(String(xVal) + String(yVal));

  if (target.occupied) {
    target.occupied.hit();
    state.computerState.randomAttack = false;
    console.log('HIT', xVal, yVal);
    if (xVal - 1 >= 0)
      if (
        !state.boardState.computerAttackedCells.includes(
          String(+xVal - 1) + String(yVal)
        )
      ) {
        state.computerState.possibleAttacks.push([xVal - 1, yVal]);
        state.boardState.computerAttackedCells.push(
          String(+xVal - 1) + String(yVal)
        );
      }
    if (xVal + 1 <= 9)
      if (
        !state.boardState.computerAttackedCells.includes(
          String(+xVal + 1) + String(yVal)
        )
      ) {
        state.computerState.possibleAttacks.push([xVal + 1, yVal]);
        state.boardState.computerAttackedCells.push(
          String(+xVal + 1) + String(yVal)
        );
      }
    if (yVal - 1 >= 0)
      if (
        !state.boardState.computerAttackedCells.includes(
          String(xVal) + String(+yVal - 1)
        )
      ) {
        state.computerState.possibleAttacks.push([xVal, yVal - 1]);
        state.boardState.computerAttackedCells.push(
          String(xVal) + String(+yVal - 1)
        );
      }
    if (yVal + 1 <= 9)
      if (
        !state.boardState.computerAttackedCells.includes(
          String(xVal) + String(+yVal + 1)
        )
      ) {
        state.computerState.possibleAttacks.push([xVal, yVal + 1]);
        state.boardState.computerAttackedCells.push(
          String(xVal) + String(+yVal + 1)
        );
      }
  } else {
    console.log('MISS!', xVal, yVal);
  }

  return {
    gameBoard: gameBoard.boardUser,
    xVal,
    yVal,
  };
};

export const checkWin = function (userType) {
  if (userType === 'player') {
    return state.boardState.computerShips.every(ship => ship.isSunk());
  }
  if (userType === 'computer') {
    return state.boardState.playerShips.every(ship => ship.isSunk());
  }
};

export const placeUserShip = function (x, y, size) {
  let coords = [x, y];
  let direction = state.userState.axis === 'X' ? 0 : 1;

  const ship = new Ship(size, undefined, false, coords, direction);

  state.boardState.playerShips.push(ship);
  gameBoard.popCells(ship, gameBoard.boardUser);
  // console.log(gameBoard.boardUser);
};

export const updateUserState = function () {
  if (state.userState.shipsLeftToPlace.total === 0) return;
  state.userState.shipsLeftToPlace.total--;

  if (state.userState.shipsLeftToPlace.total === 9)
    state.userState.currentPlacement = 'battleship';
  if (state.userState.shipsLeftToPlace.total === 7)
    state.userState.currentPlacement = 'destroyer';
  if (state.userState.shipsLeftToPlace.total === 4)
    state.userState.currentPlacement = 'patrol';
};
