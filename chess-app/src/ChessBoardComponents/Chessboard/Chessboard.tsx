import { useRef, useState } from "react";
import "./Chessboard.css";
import Tile from "../Tile/Tile";
import { VERTICAL_AXIS, HORIZONTAL_AXIS, GRID_SIZE } from "../../Constants";
import { Piece, Position } from "../../models";

interface Props {
  playMove: (piece: Piece, position: Position) => boolean;
  pieces: Piece[];
}

export default function Chessboard({ playMove, pieces }: Props) {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [grabPosition, setGrabPosition] = useState<Position>(
    new Position(-1, -1)
  );
  const chessboardRef = useRef<HTMLDivElement>(null);

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      setGrabPosition(new Position(grabX, grabY));

      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      //If x is smaller than minimum amount
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      }

      //If x is bigger than maximum amount
      else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      }

      //If x is in the constraints
      else {
        activePiece.style.left = `${x}px`;
      }

      //If y is smaller than minimum amount
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      }

      //If y is bigger than maximum amount
      else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      }

      //If y is in the constraints
      else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) => p.samePosition(grabPosition));

      if (currentPiece) {
        let succes = playMove(currentPiece.clone(), new Position(x, y));

        if (!succes) {
          //RESETS THE PIECE POSITION
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      setActivePiece(null);
    }
  }
  let listadder = [];
  
  let pawnW = 'url("assets/images/pawn_w.png")';
  let pawnB = 'url("assets/images/pawn_b.png")';
  let bishopW= 'url("assets/images/bishop_w.png")';
  let bishopB= 'url("assets/images/bishop_b.png")';
  let rookW= 'url("assets/images/rook_w.png")';
  let rookB= 'url("assets/images/rook_b.png")';
  let queenW= 'url("assets/images/queen_w.png")';
  let queenB= 'url("assets/images/queen_b.png")';
  let princeW= 'url("assets/images/prince_w.png")';
  let princeB= 'url("assets/images/prince_b.png")';
  let princessW= 'url("assets/images/princess_w.png")';
  let princessB= 'url("assets/images/princess_b.png")';
  let knightW= 'url("assets/images/knight_w.png")';
  let knightB= 'url("assets/images/knight_b.png")';
  let kingsW= 'url("assets/images/king_w.png")';
  let kingsB= 'url("assets/images/king_b.png")';
  
  if (activePiece?.style.backgroundImage === pawnW || activePiece?.style.backgroundImage === pawnB) {
    listadder.push("");
      // console.log( "" );
  }else if (activePiece?.style.backgroundImage === bishopW || activePiece?.style.backgroundImage === bishopB) {
    listadder.push("B");
      // console.log("B");
  }else if (activePiece?.style.backgroundImage === rookW || activePiece?.style.backgroundImage === rookB) {
    listadder.push("R");
      // console.log("R"); 
  }else if (activePiece?.style.backgroundImage === queenW || activePiece?.style.backgroundImage === queenB) {
    listadder.push("Q");
      // console.log("Q");
  }else if (activePiece?.style.backgroundImage === princeW || activePiece?.style.backgroundImage === princeB) {
    listadder.push("PC");
      // console.log("PC");
  }else if (activePiece?.style.backgroundImage === knightW || activePiece?.style.backgroundImage === knightB) {
    listadder.push("N");
      // console.log("N");
  }else if (activePiece?.style.backgroundImage === princessW || activePiece?.style.backgroundImage === princessB) {
    listadder.push("PS");
      // console.log("PS");
  }else if (activePiece?.style.backgroundImage === kingsW || activePiece?.style.backgroundImage === kingsB) {
    listadder.push("K");
      // console.log("K");
  }
  

  let board = [];


  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const number = j + i + 2;
      const piece = pieces.find((p) => p.samePosition(new Position(i, j)));
      let image = piece ? piece.image : undefined;

      let currentSquare = String(VERTICAL_AXIS[j]) + String(HORIZONTAL_AXIS[i]);
      
      let currentPiece =
         activePiece != null
          ? pieces.find((p) => p.samePosition(grabPosition))
          : undefined;
        let highlight = currentPiece?.possibleMoves
        ? currentPiece.possibleMoves.some((p) =>
            p.samePosition(new Position(i, j))
          )
        : false;

      board.push(
        <Tile
          key={`${j},${i}`}
          image={image}
          names={currentSquare}
          number={number}
          highlight={highlight}
        />
      );
     
      let test1 = Boolean(currentPiece?.position.y === Number(VERTICAL_AXIS[j]))
      let test2 = Boolean(currentPiece?.position.x === Number(HORIZONTAL_AXIS[i]))
      
      if (test1 && test2) {
        console.log("ssss");
      }
    }
  }

  return (
    <>
      <div
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        id="chessboard"
        ref={chessboardRef}
      >
        {board}
      </div>
    </>
  );
}
