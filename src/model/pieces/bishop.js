import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Bishop {
    static getMoves(game, from) {
        ChessMove.find(game, from, ChessPiece.forwardLeft)
        ChessMove.find(game, from, ChessPiece.forwardRight)
        ChessMove.find(game, from, ChessPiece.backwardLeft)
        ChessMove.find(game, from, ChessPiece.backwardRight)
    }
}
