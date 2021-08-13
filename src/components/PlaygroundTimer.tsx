import React from 'react'
import useAppSelector from '../hooks/useAppSelector'

function PlaygroundTimer() {
    const timer = useAppSelector(state => state.time.timer)

    return (
        <span className="timer">{timer}</span>
    )
}

export default PlaygroundTimer