import { getPossibleBishopMoves, getPossibleKingMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves, getPossibleRookMoves, getCastlingMoves, getPossiblePrincessMoves, getPossiblePrinceMoves,  } from "../referee/rules";
import { PieceType, TeamType } from "../Types";
import { Pawn } from "./Pawn";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Board {
    pieces: Piece[];
    totalTurns: number;
    winningTeam?: TeamType;

    constructor(pieces: Piece[], totalTurns: number) {
        this.pieces = pieces;
        this.totalTurns = totalTurns;
    }

    get currentTeam(): TeamType {
        return this.totalTurns % 2 === 0 ? TeamType.OPPONENT : TeamType.OUR;
    }

    calculateAllMoves() {
        // Calculate the moves of all the pieces
        for (const piece of this.pieces) {
            piece.possibleMoves = this.getValidMoves(piece, this.pieces);
        }
    
        // Calculate castling moves
        for (const king of this.pieces.filter(p => p.isKing)) {
            if (king.possibleMoves === undefined) continue;
            king.possibleMoves = [...king.possibleMoves, ...getCastlingMoves(king, this.pieces)];
        }
    
        // Check if the current team moves are valid
        this.checkCurrentTeamMoves();
    
        // Remove the possible moves for the team that is not playing
        for (const piece of this.pieces.filter(p => p.team !== this.currentTeam)) {
            piece.possibleMoves = [];
        }
    
        // Check if the playing team still has moves left
        // Otherwise, checkmate!
        if (this.pieces.filter(p => p.team === this.currentTeam)
            .some(p => p.possibleMoves !== undefined && p.possibleMoves.length > 0)) return;
    
        // Check if the original king or prince is on the board
        const originalKingOrPrince = this.pieces.find(p => p.type === PieceType.KING || p.type === PieceType.PRINCE);
        if (originalKingOrPrince) {
            this.winningTeam = (this.currentTeam === TeamType.OUR) ? TeamType.OPPONENT : TeamType.OUR;
        }
    }
    
    checkCurrentTeamMoves() {
        // Loop through all the current team's pieces
        for (const piece of this.pieces.filter(p => p.team === this.currentTeam)) {
            if (!piece || !piece.position || piece.possibleMoves === undefined) continue;
    
            // Simulate all the piece moves
            for (const move of piece.possibleMoves) {
                const simulatedBoard = this.clone();
    
                // Remove the piece at the destination position
                simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !p.samePosition(move));
    
                // Get the piece of the cloned board
                const clonedPiece = simulatedBoard.pieces.find(p => p.samePiecePosition(piece));
                if (!clonedPiece || !clonedPiece.position) continue;
                clonedPiece.position = move.clone();
    
                // Get the king and prince of the cloned board
                const clonedKing = simulatedBoard.pieces.find(p => p.type === PieceType.KING && p.team === simulatedBoard.currentTeam);
                const clonedPrince = simulatedBoard.pieces.find(p => p.type === PieceType.PRINCE && p.team === simulatedBoard.currentTeam);
                if (!clonedKing || !clonedKing.position) continue;
    
                // Check if the prince is on the board after the 10th move
                if (this.totalTurns >= 10 && clonedPrince && clonedPrince.position) {
                    // Loop through all enemy pieces, update their possible moves
                    // And check if the current team's prince will be in danger
                    for (const enemy of simulatedBoard.pieces.filter(p => p.team !== simulatedBoard.currentTeam)) {
                        if (!enemy || !enemy.position) continue;
                        enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);
                        
                        // Check if the prince can be checked
                        if (enemy.possibleMoves.some(m => m.samePosition(clonedPrince.position))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition(move));
                        }
                    }
                } else {
                    // If there is no prince or before the 10th move, check if the original king can be mated
                    if (clonedKing && clonedKing.position) {
                        for (const enemy of simulatedBoard.pieces.filter(p => p.team !== simulatedBoard.currentTeam)) {
                            if (!enemy || !enemy.position) continue;
                            enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);
                            
                            // Check if the king can be checked
                            if (enemy.possibleMoves.some(m => m.samePosition(clonedKing.position))) {
                                piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition(move));
                            }
                        }
                    }
                }
            }
        }
    }
    

    getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
        switch (piece.type) {
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece, boardState);
            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece, boardState);
            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece, boardState);
            case PieceType.ROOK:
                return getPossibleRookMoves(piece, boardState);
            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece, boardState);
            case PieceType.KING:
                return this.totalTurns >= 10 ?getPossibleKingMoves(piece, boardState) : getPossibleKingMoves(piece, boardState);
            case PieceType.PRINCE:
                return this.totalTurns >= 10 ? getPossibleKingMoves(piece, boardState) : getPossiblePrinceMoves(piece, boardState);
            case PieceType.PRINCESS:
                return this.totalTurns >= 10 ? getPossibleQueenMoves(piece, boardState) : getPossiblePrincessMoves(piece, boardState);
            default:
                return [];
        }
    }

    playMove(enPassantMove: boolean, validMove: boolean, playedPiece: Piece, destination: Position): boolean {
        const pawnDirection = playedPiece.team === TeamType.OUR ? 1 : -1;
        const destinationPiece = this.pieces.find(p => p.samePosition(destination));

        // If the move is a castling move, handle it
        if (playedPiece.isKing && destinationPiece?.isRook && destinationPiece.team === playedPiece.team) {
            const direction = (destinationPiece.position.x - playedPiece.position.x > 0) ? 1 : -1;
            const newKingXPosition = playedPiece.position.x + direction * 3;
            this.pieces = this.pieces.map(p => {
                if (p.samePiecePosition(playedPiece)) {
                    p.position.x = newKingXPosition;
                } else if (p.samePiecePosition(destinationPiece)) {
                    p.position.x = newKingXPosition - direction;
                }
                return p;
            });
            this.calculateAllMoves();
            return true;
        }

        // If the move is an en passant move, handle it
        if (enPassantMove) {
            this.pieces = this.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(playedPiece)) {
                    if (piece.isPawn) (piece as Pawn).enPassant = false;
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    piece.hasMoved = true;
                    results.push(piece);
                } else if (!piece.samePosition(new Position(destination.x, destination.y - pawnDirection))) {
                    if (piece.isPawn) (piece as Pawn).enPassant = false;
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);
            this.calculateAllMoves();
        } else if (validMove) {
            // If the move is a valid move, update the piece position and handle special moves
            this.pieces = this.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(playedPiece)) {
                    if (piece.isPawn) (piece as Pawn).enPassant =
                        Math.abs(playedPiece.position.y - destination.y) === 2 && piece.type === PieceType.PAWN;
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    piece.hasMoved = true;
                    results.push(piece);
                } else if (!piece.samePosition(destination)) {
                    if (piece.isPawn) (piece as Pawn).enPassant = false;
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);
            this.calculateAllMoves();
        } else {
            return false;
        }

        return true;
    }

    clone(): Board {
        return new Board(this.pieces.map(p => p.clone()), this.totalTurns);
    }
}
