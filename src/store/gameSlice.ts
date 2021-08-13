import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface GameState {
    won: boolean
    started: boolean
    points: number
    result: ResultItem[]
}

const initialState: GameState = {
    won: false,
    started: false,
    points: 0,
    result: [],
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        win: state => {
            state.won = true
        },
        resetWin: state => {
            state.won = false
        },
        gameStart: state => {
            state.started = true
        },
        gameStop: state => {
            state.started = false
        },
        addPoint: state => {
            state.points += 1
        },
        addResult: (state, {payload}: PayloadAction<ResultItem>) => {
            state.result = [payload, ...state.result]
        },
        resetPoints: state => {
            state.points = 0
        },
    },
})

export const {
    win,
    resetWin,
    gameStart,
    gameStop,
    addPoint,
    addResult,
    resetPoints,
} = gameSlice.actions

export default gameSlice.reducer