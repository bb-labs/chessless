import ChessMove from './move'
import ChessTeam from './team'
import ChessBoard from './board'
import ChessPiece from './piece'

export default class ChessTurn {
    constructor(
        team = ChessPiece.WHITE,
        board = new ChessBoard([
            ...ChessTeam.init(ChessPiece.WHITE),
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            ...ChessTeam.init(ChessPiece.BLACK)
        ]),
        moves = null
    ) {
        this.team = team
        this.board = board
        this.moves = moves || this.getMoves()
    }

    getMoves() {
        const moves = []

        for (let index = 0; index < this.board.length; index++) {
            const piece = this.board[index]
            const type = ChessPiece.getType(piece)

            if (!piece)
                continue

            moves.push(...ChessMove[type](this, piece, index))
        }

        return new Set(moves)
    }

    makeMove(from, to) {
        const game = this.clone()
        const move = ChessMove.create(from, to)

        if (!game.moves.has(move))
            return game

        game.board[to] = game.board[from]
        game.board[from] = 0
        game.team = Number(!game.team)
        game.moves = game.getMoves()

        return game
    }

    clone() {
        return new ChessTurn(
            this.team,
            this.board.slice(),
            new Set(this.moves)
        )
    }
}
