import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface CardsState {
    first: {
        id: number | null
        value: number | null
    }
    second: {
        id: number | null
        value: number | null
    }
    inGame: number[]
    valuesOfRemoved: number[]
}

const initialState: CardsState = {
    first: {
        id: null,
        value: null,
    },
    second: {
        id: null,
        value: null,
    },
    inGame: [],
    valuesOfRemoved: [],
}

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setFirstId: (state, {payload}) => {
            state.first.id = payload
        },
        setFirstValue: (state, {payload}) => {
            state.first.value = payload
        },
        setSecondId: (state, {payload}) => {
            state.second.id = payload
        },
        setSecondValue: (state, {payload}) => {
            state.second.value = payload
        },
        removeValueOfPairedCards: (state, {payload}: PayloadAction<number>) => {
            state.valuesOfRemoved = [...state.valuesOfRemoved, payload]
        },
        resetCards: state => {
            state.first.id = null
            state.first.value = null
            state.second.id = null
            state.second.value = null
        },
        resetValuesOfRemoved: state => {
            state.valuesOfRemoved = []
        },
    },
})

export const {
    setFirstId,
    setFirstValue,
    setSecondId,
    setSecondValue,
    resetCards,
    removeValueOfPairedCards,
    resetValuesOfRemoved,
} = cardsSlice.actions

export default cardsSlice.reducer