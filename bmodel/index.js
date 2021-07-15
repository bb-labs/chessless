import { parseFEN, STARTING_FEN } from "./utils"
import { PieceMap, ChessPiece } from './pieces'

export default class ChessGame {
  // States
  static FOUND_CHECK = 0
  static EMPTY_SQUARE = 1
  static MOVES_EXHAUSTED = 2
  static PUTS_KING_IN_CHECK = 3
  static CAPTURE_OPPORTUNITY = 4

  // Constructors
  constructor({ FEN = STARTING_FEN, game }) {
    if (game) this.copyConstructor(game)
    else this.fenConstructor(FEN)
  }

  fenConstructor(FEN) {
    const [board, turn, castles, enpassant] = parseFEN(FEN)

    // Metadata
    this.turn = turn
    this.castles = castles
    this.enpassant = enpassant

    // Record the history
    this.moves = []
    this.boards = []

    // Map the board of strings into a board of piece objects
    this.board = board.map((piece, location) => {
      if (!piece) return null

      // Grab the class from the PieceMap
      const Piece = PieceMap[piece]

      // Create the new piece for the appropriate team
      return new Piece(ChessPiece.getTeamFromFEN(piece), location)
    })
  }

  copyConstructor(game) {
    this.turn = game.turn
    this.castles = game.castles
    this.enpassant = game.enpassant

    this.moves = game.moves.slice()
    this.board = game.board.slice()
    this.boards = game.boards.slice()
  }

  // Helpers
  sameTeam(square1, square2) { return this.board[square1] && this.board[square2] && this.board[square1].team() === this.board[square2].team() }
  otherTeam(square1, square2) { return this.board[square1] && this.board[square2] && this.board[square1].team() !== this.board[square2].team() }

  state(candidateMove, { start, end, empty, capture } = candidateMove) {
    if (end === false) return ChessGame.MOVES_EXHAUSTED // Takes us out of bounds
    if (this.sameTeam(start, end)) return ChessGame.MOVES_EXHAUSTED // Ran into teammate, work is done
    if (this.putsKingInCheck(candidateMove)) return ChessGame.PUTS_KING_IN_CHECK // Move is illegal
    if (this.otherTeam(start, end) && capture) return ChessGame.CAPTURE_OPPORTUNITY // Ran into other team and can capture
    if (this.otherTeam(start, end)) return ChessGame.MOVES_EXHAUSTED // Ran into other team but can't capture
    if (empty) return ChessGame.EMPTY_SQUARE // Found empty square and can move there
    return ChessGame.MOVES_EXHAUSTED // Move is invalid
  }

  consider(candidateMoves, verifiedMoves) {
    for (candidate of candidateMoves) {
      for (const candidateMove of ChessMove.generator(this, piece, candidate, s)) {
        switch (this.state(candidateMove)) {
          case ChessGame.FOUND_CHECK: return true
          case ChessGame.MOVES_EXHAUSTED: break
          case ChessGame.PUTS_KING_IN_CHECK: continue
          case ChessGame.EMPTY_SQUARE: verifiedMoves.push(candidateMove); continue
          case ChessGame.CAPTURE_OPPORTUNITY: verifiedMoves.push(candidateMove); break
        }
      }
    }
  }

  getMoves() {
    const moves = []

    for (let s = 0; s < this.board.length; s++) {
      if (!this.board[s] || this.board[s].team() !== this.turn) continue

      const result = this.consider(this.board[s].constructor.moves, moves)
      
      if (result !== undefined) return result
    }

    return moves
  }

  clone() { return new ChessGame({ game: this }) }
}
