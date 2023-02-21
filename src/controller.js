import gameBoard from './models/gameBoard';
import * as model from './models/model';
import gameBoardView from './views/gameBoardView';
import pregameView from './views/pregameView';

const handleGameBoard = function () {
  gameBoardView.render(model.state.boardState);
  gameBoardView._handleShipPlacements();
};

const handleAttack = function (x, y) {
  // Fire shot at AI
  const shotFired = model.fireShot(x, y);
  // Check if all boats sunk
  const gameOver = model.checkWin('computer');
  if (gameOver) console.log('WINNER!');
  return shotFired;
};

const handleUserPregame = function () {
  pregameView.render();
};

const handleUserShipPlacements = function (x, y) {
  let size;
  if (model.state.userState.currentPlacement === 'carrier') size = 5;
  if (model.state.userState.currentPlacement === 'battleship') size = 4;
  if (model.state.userState.currentPlacement === 'destroyer') size = 3;
  if (model.state.userState.currentPlacement === 'patrol') size = 2;

  model.placeUserShip(x, y, size);
  console.log(model.state.boardState.playerShips);
  console.log(model.state.boardState.playerBoardSlots);
};

const init = function () {
  handleGameBoard();
  gameBoardView.handleAttacks(
    handleAttack,
    model.state.boardState.attackedCells
  );

  pregameView.handlePlayGameButton(handleUserPregame);
  gameBoardView.handleUserShipPlacements(handleUserShipPlacements, model.state);
};

init();
