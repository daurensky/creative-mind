/// <reference types="react-scripts" />

interface CardRow {
    id: number
    value: number
}

interface PlaygroundCard {
    id: number
    value: number
    cardRemoved: boolean
    gameStarted: boolean
    firstId: number | null
    secondId: number | null
}

interface ResultItem {
    stopwatch: string
    points: number
}