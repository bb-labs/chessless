import Pawn from './pieces/pawn'
import Rook from './pieces/rook'
import King from './pieces/king'
import Queen from './pieces/queen'
import Bishop from './pieces/bishop'
import Knight from './pieces/knight'

import ChessPiece from './piece'

export default class ChessTeam {
    static PIECE_ID = 0
    static NUM_PAWNS = 8

    static switch(team) {
        return team === ChessPiece.BLACK ? ChessPiece.WHITE : ChessPiece.BLACK
    }

    static init(team) {
        return team === ChessPiece.BLACK
            ? [...ChessTeam.initPawns(team), ...ChessTeam.initPieces(team)]
            : [...ChessTeam.initPieces(team), ...ChessTeam.initPawns(team)]
    }

    static initPawns(team) {
        return [
            new Pawn(team), 
            new Pawn(team),
            new Pawn(team), 
            new Pawn(team),
            new Pawn(team), 
            new Pawn(team),
            new Pawn(team), 
            new Pawn(team),
        ]
    }

    static initPieces(team) {
        return [
            new Rook(team),
            new Knight(team),
            new Bishop(team), 
            new Queen(team),
            new King(team), 
            new Bishop(team),
            new Knight(team), 
            new Rook(team)
        ]
    }
}
