import ChessPiece from './piece.js'

export default class Bishop extends ChessPiece {
    static attackInRange = () => true
    static attackDirections = new Set([ChessPiece.ATTACKS_DIAGONALLY])
    constructor(team, id) { super(ChessPiece.BISHOP, team, id) }

    getMoves(game, square) {
        return [
            super.getMoves(game, square, super.moveForwardLeft.bind(this)),
            super.getMoves(game, square, super.moveForwardRight.bind(this)),
            super.getMoves(game, square, super.moveBackwardLeft.bind(this)),
            super.getMoves(game, square, super.moveBackwardRight.bind(this))
        ]
    }
}