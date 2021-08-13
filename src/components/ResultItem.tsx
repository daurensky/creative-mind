import React from 'react'

function ResultItem({stopwatch, points}: ResultItem) {
    return (
        <tr>
            <td>{stopwatch}</td>
            <td>{points}</td>
        </tr>
    )
}

export default ResultItem