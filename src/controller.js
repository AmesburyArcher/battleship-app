import gameBoard from './models/gameBoard';
import * as model from './models/model';
import gameBoardView from './views/gameBoardView';
import pregameView from './views/pregameView';
import gameMessagesView from './views/gameMessagesView';
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
  if (gameOver) {
    gameMessagesView.render(true, model.state.boardState.currentTurn, 'hit');
    model.state.boardState.gameOver = true;
    return shotFired;
  } else {
    gameMessagesView.render(
      false,
      model.state.boardState.currentTurn,
      shotFired === 0 ? 'missed' : 'hit'
    );
  }
  model.state.boardState.currentTurn = 'computer';
  const timeout = setTimeout(function () {
    const hit = gameBoardView.handleComputerAttack(
      model.computerAttack,
      model.state.boardState
    );
    const gameOverPC = model.checkWin(model.state.boardState.currentTurn);
    console.log(gameOverPC, hit);
    if (gameOverPC) {
      gameMessagesView.render(true, model.state.boardState.currentTurn, 'hit');
      model.state.boardState.gameOver = true;
    } else {
      gameMessagesView.render(
        false,
        model.state.boardState.currentTurn,
        hit === false ? 'missed' : 'hit'
      );
    }
    model.state.boardState.currentTurn = 'player';
  }, 500);

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
  }
  // console.log(model.state.boardState.playerShips);
  // console.log(model.state.boardState.playerBoardSlots);
};

const handlePlayGame = function () {};

const init = function () {
  handleGameBoard();

  pregameView.handlePlayGameButton(handleUserPregame, model.state.userState);
  model.state.computerState.possibleAttacks = new Stack();
};

init();
