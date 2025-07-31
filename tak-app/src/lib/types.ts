export type Color = 'black' | 'white'
export type PieceType = 'flat' | 'standing' | 'capstone' // flat is square, standing is rectangle (0.33:1), capstone is circle

export type Piece = {
    color: Color,
    type: PieceType
}

export type Stack = Piece[]

export type Board = Stack[][]

export type GameState = {
    turn: number,
    board: Board,
    currentPlayer: Color,
    unplayed_pieces: {
        [color in Color]: Stack // Pieces in this stack can only be either flat or capstone
    }
}
