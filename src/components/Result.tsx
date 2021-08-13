import React from 'react'
import ResultItem from './ResultItem'
import useAppSelector from '../hooks/useAppSelector'

function Result() {
    const result = useAppSelector(state => state.game.result)

    return (
        <table className="result">
            <thead>
            <tr>
                <th>Время</th>
                <th>Счет</th>
            </tr>
            </thead>
            <tbody>
            {result.map(({stopwatch, points}, index) => (
                <ResultItem stopwatch={stopwatch} points={points} key={index}/>
            ))}
            </tbody>
        </table>
    )
}

export default Result