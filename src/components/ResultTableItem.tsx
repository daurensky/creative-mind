import React from 'react'

function ResultTableItem({stopwatch, points}: ResultItem) {
    return (
        <tr>
            <td>{stopwatch}</td>
            <td>{points}</td>
        </tr>
    )
}

export default ResultTableItem