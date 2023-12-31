import { TeamType } from "../../Types";
import { Piece, Position } from "../../models";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const princeMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
  console.log("prince");
    return false;
  }

  export const getPossiblePrinceMoves = (prince: Piece, boardstate: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // Top movement
    for(let i = 2; i < 4; i++) {
      const destination = new Position(prince.position.x, prince.position.y + i);

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, prince.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Bottom movement
    for(let i = 2; i < 4; i++) {
      const destination = new Position(prince.position.x, prince.position.y - i);

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, prince.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Left movement
    for(let i = 2; i < 4; i++) {
      const destination = new Position(prince.position.x - i, prince.position.y);

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, prince.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }

    // Right movement
    for(let i = 2; i < 4; i++) {
      const destination = new Position(prince.position.x + i, prince.position.y);

      if(!tileIsOccupied(destination, boardstate)) {
        possibleMoves.push(destination);
      } else if(tileIsOccupiedByOpponent(destination, boardstate, prince.team)) {
        possibleMoves.push(destination);
        break;
      } else {
        break;
      }
    }
    return possibleMoves;
  }