import gameBoard from './models/gameBoard';
import * as model from './models/model';
import gameBoardView from './views/gameBoardView';

const handleGameBoard = function () {
  gameBoardView.render(model.state.boardState);
  gameBoardView._handleShipPlacements();
};

const handleAttack = function (x, y) {
  return model.fireShot(x, y);
};

const init = function () {
  handleGameBoard();
  gameBoardView._handleAttacks(handleAttack);
};

init();
