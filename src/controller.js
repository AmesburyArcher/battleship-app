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

const handleUserShipPlacements = function () {};

const init = function () {
  handleGameBoard();
  gameBoardView.handleAttacks(
    handleAttack,
    model.state.boardState.attackedCells
  );

  pregameView.handlePlayGameButton(handleUserPregame);
};

init();
