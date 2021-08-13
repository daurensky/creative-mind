import React, {useEffect, useState} from 'react'
import useAppSelector from '../hooks/useAppSelector'
import PlaygroundCard from './PlaygroundCard'
import initCards from '../support/initCards'

function Playground({cards}: { cards: CardRow[][] }) {
    const firstCardId = useAppSelector(state => state.cards.first.id)
    const secondCardId = useAppSelector(state => state.cards.second.id)
    const valuesOfRemoved = useAppSelector(state => state.cards.valuesOfRemoved)

    const won = useAppSelector(state => state.game.won)
    const started = useAppSelector(state => state.game.started)

    return (
        <table className={`playground ${won ? 'blurred' : ''}`}>
            <tbody>
            {cards.map((row, index) => (
                <tr key={index}>
                    {row.map(({id, value}) => (
                        <PlaygroundCard
                            id={id}
                            value={value}
                            cardRemoved={valuesOfRemoved.includes(value)}
                            gameStarted={started}
                            firstId={firstCardId}
                            secondId={secondCardId}
                            key={id}
                        />
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Playground