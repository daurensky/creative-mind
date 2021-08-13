import React from 'react'
import useAppSelector from '../hooks/useAppSelector'

function Timer() {
    const timer = useAppSelector(state => state.time.timer)

    return (
        <span className="countdown">{timer}</span>
    )
}

export default Timer