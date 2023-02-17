import gameBoard from './models/gameBoard';
import * as model from './models/model';
import gameBoardView from './views/gameBoardView';

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

const init = function () {
  handleGameBoard();
  gameBoardView._handleAttacks(
    handleAttack,
    model.state.boardState.attackedCells
  );
};

init();
