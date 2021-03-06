export const NUM_RANKS = 8
export const NUM_FILES = 8
export const NUM_SQUARES = 8 * 8

export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export const RANKS = [8, 7, 6, 5, 4, 3, 2, 1]
export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export const parseFEN = function (FEN) {
  // Split FEN into constituent parts
  const [position, turn, castles, enPassant] = FEN.split(' ')

  // Create the board
  const board = new Array(NUM_SQUARES).fill(null)

  // Fill up the board with pieces
  let i = 0
  for (const square of position.replace(/\//g, '')) {
    const containsPiece = isNaN(square)

    if (containsPiece) board[i] = square

    i += containsPiece ? 1 : +square
  }

  // Return the board and turn
  return [board, turn, castles, convertFromAlgebraic(enPassant)]
}

export const convertToAlgebraic = function (index) {
  const [rank, file] = rankAndFileOf(index)

  return FILES[file] + RANKS[rank]
}

export const convertFromAlgebraic = function (square) {
  const [file, rank] = square

  return indexOf(8 - +rank, file.toLowerCase().charCodeAt() - 97)
}

export const rankAndFileOf = function (index) {
  return [Math.floor(index / NUM_RANKS), index % NUM_FILES]
}

export const indexOf = function (rank, file) {
  if (rank < 0 || rank >= NUM_RANKS || file < 0 || file >= NUM_FILES) return undefined

  return rank * NUM_RANKS + file
}

