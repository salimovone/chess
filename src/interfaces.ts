import { boardRow, teamColor } from "./types";

export interface CounterState {
    boardMap: [
        boardRow,
        boardRow,
        boardRow,
        boardRow,
        boardRow,
        boardRow,
        boardRow,
        boardRow,
    ];
    selected: Selected
}

export interface Selected {
    isSelected: boolean;
    team?: teamColor;
    x: number;
    y: number;
    freeSquares: freeSquare[]
    freeWinnerSquares: freeSquare[]
}

export interface freeSquare {
    x: number;
    y: number;
}

export interface handleClickSquarePayload extends freeSquare {}