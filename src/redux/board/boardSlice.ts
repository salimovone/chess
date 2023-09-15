import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CounterState, freeSquare, handleClickSquarePayload } from '../../interfaces'
import type { teamColor } from '../../types'

const initialState: CounterState = {
    boardMap: [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [3, 0, 3, 0, 3, 0, 3, 0],
        [0, 3, 0, 3, 0, 3, 0, 3],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
    ],
    selected: {
        isSelected: false,
        freeSquares: [],
        freeWinnerSquares: [],
        x: -1,
        y: -1
    },
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        handleSelect: (state, action: PayloadAction<{ x: number; y: number; team: teamColor }>) => {
            state.selected.isSelected = true;
            state.selected.x = action.payload.x
            state.selected.y = action.payload.y
            state.selected.team = action.payload.team

            let arr = state.boardMap
            let xAxis: number = action.payload.x
            let yAxis: number = action.payload.y

            //shunchaki dona oldingi qatorga o'tishi uchun
            if (action.payload.team === 'dark') {
                let freeSquareArr: freeSquare[] = []
                if (arr[yAxis + 1][xAxis + 1] === 3) {
                    freeSquareArr = [...freeSquareArr, { x: xAxis + 1, y: yAxis + 1 }]
                }
                if (arr[yAxis + 1][xAxis - 1] === 3) {
                    freeSquareArr = [...freeSquareArr, { x: xAxis - 1, y: yAxis + 1 }]
                }
                state.selected.freeSquares = freeSquareArr
            }
            if (action.payload.team === 'light') {
                let freeSquareArr: freeSquare[] = []
                if (arr[yAxis - 1][xAxis + 1] === 3) {
                    freeSquareArr = [...freeSquareArr, { x: xAxis + 1, y: yAxis - 1 }]
                }
                if (arr[yAxis - 1][xAxis - 1] === 3) {
                    freeSquareArr = [...freeSquareArr, { x: xAxis - 1, y: yAxis - 1 }]
                }
                state.selected.freeSquares = freeSquareArr
            }

            //dona qarama qarshi tomondan dona olishi va oldinga yurishi uchun
            if (action.payload.team === 'dark') {
                let freeSquareWinArr: freeSquare[] = []
                if (arr[yAxis + 2][xAxis + 2] === 3 && arr[yAxis + 1][xAxis + 1] === 2) {
                    freeSquareWinArr = [...freeSquareWinArr, { x: xAxis + 2, y: yAxis + 2 }]
                }
                if (arr[yAxis + 2][xAxis - 2] === 3 && arr[yAxis + 1][xAxis - 1] === 2) {
                    freeSquareWinArr = [...freeSquareWinArr, { x: xAxis - 2, y: yAxis + 2 }]
                }
                state.selected.freeWinnerSquares = freeSquareWinArr
            }
            if (action.payload.team === 'light') {
                let freeSquareWinArr: freeSquare[] = []
                if (arr[yAxis - 2][xAxis + 2] === 3 && arr[yAxis - 1][xAxis + 1] === 1) {
                    freeSquareWinArr = [...freeSquareWinArr, { x: xAxis + 2, y: yAxis - 2 }]
                }
                if (arr[yAxis - 2][xAxis - 2] === 3 && arr[yAxis - 1][xAxis - 1] === 1) {
                    freeSquareWinArr = [...freeSquareWinArr, { x: xAxis - 2, y: yAxis - 2 }]
                }
                state.selected.freeWinnerSquares = freeSquareWinArr
            }
        },


        handleClickSquare: (state, action: PayloadAction<handleClickSquarePayload>): void => {
            let sx = state.selected.x
            let sy = state.selected.y
            let px = action.payload.x
            let py = action.payload.y
            let board = state.boardMap
            let team = state.selected.team

            //shunchaki dona oldingi qatorga o'tishi uchun
            if (state.selected.isSelected) {
                if (state.selected.freeSquares.find(item => item.x === px && item.y === py) !== undefined) {
                    state.boardMap[py][px] = board[sy][sx]
                    state.boardMap[sy][sx] = 3
                }
            }

            //dona qarama qarshi tomondan dona olishi va oldinga yurishi uchun
            if (state.selected.freeWinnerSquares.find(item => item.x === px && item.y === py) !== undefined) {
                state.boardMap[py][px] = board[sy][sx]
                state.boardMap[sy][sx] = 3
                if (team === 'dark') {
                    if (px - sx > 0) {
                        state.boardMap[sy + 1][sx + 1] = 3
                    } else {
                        state.boardMap[sy + 1][sx - 1] = 3
                    }
                } else {
                    if (px - sx > 0) {
                        state.boardMap[sy - 1][sx + 1] = 3
                    } else {
                        state.boardMap[sy - 1][sx - 1] = 3
                    }
                }
            }
        }
    }
})

export const { handleSelect, handleClickSquare } = boardSlice.actions
export default boardSlice.reducer