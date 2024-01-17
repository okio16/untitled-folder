import { Piece, Position } from "../../models";
import { TeamType } from "../../Types";
import { tileIsEmptyOrOccupiedByOpponent, tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const retiredkingMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
  console.log("king");
  for (let i = 1; i < 2; i++) {
    //Diagonal
    let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0;
    let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;

    let passedPosition = new Position(initialPosition.x + (i * multiplierX), initialPosition.y + (i * multiplierY));

    if (passedPosition.samePosition(desiredPosition)) {
      if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
        return true;
      }
    } else {
      if (tileIsOccupied(passedPosition, boardState)) {
        break;
      }
    }
  }
  return false;
}

export const getPossibleRetiredKingMoves = (retiredking: Piece, boardstate: Piece[]): Position[] => {
  const possibleMoves: Position[] = [];

  // Top movement
  for (let i = 1; i < 2; i++) {
    const destination = new Position(retiredking.position.x, retiredking.position.y + i);

    // If the move is outside of the board don't add it
    if(destination.x < 0 || destination.x > 9 
      || destination.y < 0 || destination.y > 9) {
        break;
    }

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, retiredking.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom movement
  for (let i = 1; i < 2; i++) {
    const destination = new Position(retiredking.position.x, retiredking.position.y - i);

    // If the move is outside of the board don't add it
    if(destination.x < 0 || destination.x > 9 
      || destination.y < 0 || destination.y > 9) {
        break;
    }

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, retiredking.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Left movement
  for (let i = 1; i < 2; i++) {
    const destination = new Position(retiredking.position.x - i, retiredking.position.y);

    // If the move is outside of the board don't add it
    if(destination.x < 0 || destination.x > 9 
      || destination.y < 0 || destination.y > 9) {
        break;
    }

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, retiredking.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Right movement
  for (let i = 1; i < 2; i++) {
    const destination = new Position(retiredking.position.x + i, retiredking.position.y);

    // If the move is outside of the board don't add it
    if(destination.x < 0 || destination.x > 9 
      || destination.y < 0 || destination.y > 9) {
        break;
    }

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, retiredking.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }

  }

  // Upper right movement
  for (let i = 1; i < 2; i++) {
    const destination = new Position(retiredking.position.x + i, retiredking.position.y + i);

    // If the move is outside of the board don't add it
    if(destination.x < 0 || destination.x > 9 
      || destination.y < 0 || destination.y > 9) {
        break;
    }

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, retiredking.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom right movement
  for (let i = 1; i < 2; i++) {
    const destination = new Position(retiredking.position.x + i,retiredking.position.y - i);

    // If the move is outside of the board don't add it
    if(destination.x < 0 || destination.x > 9 
      || destination.y < 0 || destination.y > 9) {
        break;
    }

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate,retiredking.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Bottom left movement
  for (let i = 1; i < 2; i++) {
    const destination = new Position(retiredking.position.x - i, retiredking.position.y - i);

    // If the move is outside of the board don't add it
    if(destination.x < 0 || destination.x > 9 
      || destination.y < 0 || destination.y > 9) {
        break;
    }

    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, retiredking.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  // Top left movement
  for (let i = 1; i < 2; i++) {
    const destination = new Position(retiredking.position.x - i, retiredking.position.y + i);

    // If the move is outside of the board don't add it
    if(destination.x < 0 || destination.x > 9 
      || destination.y < 0 || destination.y > 9) {
        break;
    }
    
    if (!tileIsOccupied(destination, boardstate)) {
      possibleMoves.push(destination);
    } else if (tileIsOccupiedByOpponent(destination, boardstate, retiredking.team)) {
      possibleMoves.push(destination);
      break;
    } else {
      break;
    }
  }

  return possibleMoves;
}


