import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CounterState, freeSquare } from '../../interfaces'
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
        freeSquares: []
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
            if (action.payload.team === 'dark') {
                let freeSquareArr: freeSquare[] = []
                if (arr[yAxis + 1][xAxis + 1] === 3) {
                    freeSquareArr = [...freeSquareArr, { x: xAxis + 1, y: yAxis + 1 }]
                }
                if (arr[yAxis + 1][xAxis - 1] === 3) {
                    freeSquareArr = [...freeSquareArr, { x: xAxis + 1, y: yAxis - 1 }]
                }
                state.selected.freeSquares = freeSquareArr
            }
            if (action.payload.team === 'light') {
                let freeSquareArr: freeSquare[] = []
                if (arr[yAxis - 1][xAxis + 1] === 3) {
                    freeSquareArr = [...freeSquareArr, { x: xAxis + 1, y: yAxis + 1 }]
                }
                if (arr[yAxis - 1][xAxis - 1] === 3) {
                    freeSquareArr = [...freeSquareArr, { x: xAxis + 1, y: yAxis - 1 }]
                }
                state.selected.freeSquares = freeSquareArr
            }
        },
        handleClickSquare: (state):void => {

        }
    }
})

export const { handleSelect } = boardSlice.actions
export default boardSlice.reducer