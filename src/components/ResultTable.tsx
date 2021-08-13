import React from 'react'
import ResultTableItem from './ResultTableItem'
import useAppSelector from '../hooks/useAppSelector'

function ResultTable() {
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
                <ResultTableItem stopwatch={stopwatch} points={points} key={index}/>
            ))}
            </tbody>
        </table>
    )
}

export default ResultTable