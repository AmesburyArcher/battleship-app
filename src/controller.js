import gameBoard from './models/gameBoard';
import * as model from './models/model';
import gameBoardView from './views/gameBoardView';
import pregameView from './views/pregameView';
import { Stack } from './helpers';

const handleGameBoard = function () {
  gameBoardView.render(model.state.boardState);
  gameBoardView._handleShipPlacements();
};

const handleAttack = function (x, y) {
  // Fire shot at AI
  const shotFired = model.fireShot(x, y);
  // Check if all boats sunk
  const gameOver = model.checkWin(model.state.boardState.currentTurn);
  if (gameOver) console.log('WINNER!');
  return shotFired;
};

const handleUserPregame = function () {
  pregameView.render();
  gameBoardView.handleUserShipPlacements(handleUserShipPlacements, model.state);
};

const handleUserShipPlacements = function (x, y) {
  let size;
  if (model.state.userState.currentPlacement === 'carrier') size = 5;
  if (model.state.userState.currentPlacement === 'battleship') size = 4;
  if (model.state.userState.currentPlacement === 'destroyer') size = 3;
  if (model.state.userState.currentPlacement === 'patrol') size = 2;

  model.placeUserShip(x, y, size);
  model.updateUserState();
  if (model.state.userState.shipsLeftToPlace.total === 0) {
    pregameView.clear();
    //Start game with attacks
    gameBoardView.handleAttacks(handleAttack, model.state.boardState);
    model.computerAttack();
    model.computerAttack();
    model.computerAttack();
    model.computerAttack();
    console.log(model.state.computerState.possibleAttacks);
  }
  // console.log(model.state.boardState.playerShips);
  // console.log(model.state.boardState.playerBoardSlots);
};

const init = function () {
  handleGameBoard();

  pregameView.handlePlayGameButton(handleUserPregame, model.state.userState);
  model.state.computerState.possibleAttacks = new Stack();
};

init();
