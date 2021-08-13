import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import moment from 'moment'

export const timeSlice = createSlice({
    name: 'time',
    initialState: {
        timer: 5,
        stopwatch: '00:00:00',
    },
    reducers: {
        tickTimer: state => {
            state.timer -= 1
        },
        tickStopWatch: (state, {payload}: PayloadAction<number>) => {
            state.stopwatch = moment().hour(0).minute(0).second(payload).format('HH:mm:ss')
        },
        resetTimer: state => {
            state.timer = 5
        },
        resetStopwatch: state => {
            state.stopwatch = '00:00:00'
        },
    },
})

export const {
    tickTimer,
    resetTimer,
    tickStopWatch,
    resetStopwatch,
} = timeSlice.actions

export default timeSlice.reducer