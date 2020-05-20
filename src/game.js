const ranks = [1, 2, 3, 4, 5, 6, 7, 8]
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

const rank_set = new Set(ranks)
const file_set = new Set(files)

function position({ rank, file }) {
    file = file.toLowerCase()

    if (!file_set.has(file))
        throw 'You passed an invalid file'

    if (!rank_set.has(rank))
        throw 'You passed an invalid rank'

    const numeric_rank = (rank - 1) * 8
    const numeric_file = file.charCodeAt() - 97

    return numeric_rank + numeric_file
}

function testPosition() {
    let i = 0

    for (const rank of ranks)
        for (const file of files)
            console.assert(position(rank, file) === i++)
}

// Team Alive  Type  ID   Loc
// 0    0      000   0000 000000

const white = new Uint16Array([
    (0 << 14) | (1 << 13) | (0 << 10) | (0 << 6) | (0 << 0), // rook
    (0 << 14) | (1 << 13) | (1 << 10) | (1 << 6) | (1 << 0), // knight
    (0 << 14) | (1 << 13) | (2 << 10) | (2 << 6) | (2 << 0), // bishop
    (0 << 14) | (1 << 13) | (3 << 10) | (3 << 6) | (3 << 0), // queen
    (0 << 14) | (1 << 13) | (4 << 10) | (4 << 6) | (4 << 0), // king
    (0 << 14) | (1 << 13) | (2 << 10) | (5 << 6) | (5 << 0), // bishop
    (0 << 14) | (1 << 13) | (1 << 10) | (6 << 6) | (6 << 0), // knight
    (0 << 14) | (1 << 13) | (0 << 10) | (7 << 6) | (7 << 0), // rook
    (0 << 14) | (1 << 13) | (5 << 10) | (8 << 6) | (8 << 0), // pawn
    (0 << 14) | (1 << 13) | (5 << 10) | (9 << 6) | (9 << 0), // pawn
    (0 << 14) | (1 << 13) | (5 << 10) | (10 << 6) | (10 << 0), // pawn
    (0 << 14) | (1 << 13) | (5 << 10) | (11 << 6) | (11 << 0), // pawn
    (0 << 14) | (1 << 13) | (5 << 10) | (12 << 6) | (12 << 0), // pawn
    (0 << 14) | (1 << 13) | (5 << 10) | (13 << 6) | (13 << 0), // pawn
    (0 << 14) | (1 << 13) | (5 << 10) | (14 << 6) | (14 << 0), // pawn
    (0 << 14) | (1 << 13) | (5 << 10) | (15 << 6) | (15 << 0), // pawn
])

const black = new Uint16Array([
    (1 << 14) | (1 << 13) | (0 << 10) | (0 << 6) | (63 << 0), // rook
    (1 << 14) | (1 << 13) | (1 << 10) | (1 << 6) | (62 << 0), // knight
    (1 << 14) | (1 << 13) | (2 << 10) | (2 << 6) | (61 << 0), // bishop
    (1 << 14) | (1 << 13) | (3 << 10) | (3 << 6) | (60 << 0), // queen
    (1 << 14) | (1 << 13) | (4 << 10) | (4 << 6) | (59 << 0), // king
    (1 << 14) | (1 << 13) | (2 << 10) | (5 << 6) | (58 << 0), // bishop
    (1 << 14) | (1 << 13) | (1 << 10) | (6 << 6) | (57 << 0), // knight
    (1 << 14) | (1 << 13) | (0 << 10) | (7 << 6) | (56 << 0), // rook
    (1 << 14) | (1 << 13) | (5 << 10) | (8 << 6) | (55 << 0), // pawn
    (1 << 14) | (1 << 13) | (5 << 10) | (9 << 6) | (54 << 0), // pawn
    (1 << 14) | (1 << 13) | (5 << 10) | (10 << 6) | (53 << 0), // pawn
    (1 << 14) | (1 << 13) | (5 << 10) | (11 << 6) | (52 << 0), // pawn
    (1 << 14) | (1 << 13) | (5 << 10) | (12 << 6) | (51 << 0), // pawn
    (1 << 14) | (1 << 13) | (5 << 10) | (13 << 6) | (50 << 0), // pawn
    (1 << 14) | (1 << 13) | (5 << 10) | (14 << 6) | (49 << 0), // pawn
    (1 << 14) | (1 << 13) | (5 << 10) | (15 << 6) | (48 << 0), // pawn
])
