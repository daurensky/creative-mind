import React, {useEffect} from 'react'
import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useAppDispatch'
import {gameStart, gameStop, addResult, resetPoints, resetWin} from '../store/gameSlice'
import {tickStopWatch, resetStopwatch, resetTimer} from '../store/timeSlice'
import {resetCards, resetValuesOfRemoved} from '../store/cardsSlice'

function GameBar() {
    const dispatch = useAppDispatch()

    const stopwatch = useAppSelector(state => state.time.stopwatch)
    const timer = useAppSelector(state => state.time.timer)
    const points = useAppSelector(state => state.game.points)
    const started = useAppSelector(state => state.game.started)
    const won = useAppSelector(state => state.game.won)

    function handleClick() {
        dispatch(resetWin())
        dispatch(started ? gameStop() : gameStart())
    }

    useEffect(() => {
        timer === 0 && dispatch(gameStop())
    }, [timer])

    useEffect(() => {
        if (started) {
            let seconds = 1

            const timer = setInterval(() => {
                dispatch(tickStopWatch(seconds++))
            }, 1000)

            return () => clearInterval(timer)
        } else {
            if (stopwatch !== '00:00:00') {
                dispatch(addResult({stopwatch: won ? `👑 ${stopwatch}` : stopwatch, points}))
            }
            dispatch(resetCards())
            dispatch(resetValuesOfRemoved())
            dispatch(resetStopwatch())
            dispatch(resetTimer())
            dispatch(resetPoints())
        }
    }, [started])

    return (
        <div className="game-bar">
            <h2>{stopwatch}</h2>
            <h2>Счет: {points}</h2>
            <button onClick={handleClick} className="start-btn">{started ? 'Стоп' : 'Старт'}</button>
        </div>
    )
}

export default GameBar