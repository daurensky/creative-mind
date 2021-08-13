import React, {useEffect, useState} from 'react'
import WinMessage from './WinMessage'
import useAppSelector from '../hooks/useAppSelector'
import Timer from './Timer'
import Playground from './Playground'
import useAppDispatch from '../hooks/useAppDispatch'
import {resetCards, removeValueOfPairedCards} from '../store/cardsSlice'
import {addPoint, gameStop, win} from '../store/gameSlice'
import {resetTimer, tickTimer} from '../store/timeSlice'
import initCards from '../support/initCards'

function AreaPlayground() {
    const dispatch = useAppDispatch()

    const [cards, setCards] = useState<CardRow[][]>([])

    const firstCardValue = useAppSelector(state => state.cards.first.value)
    const secondCardValue = useAppSelector(state => state.cards.second.value)
    const valuesOfRemoved = useAppSelector(state => state.cards.valuesOfRemoved)
    const won = useAppSelector(state => state.game.won)
    const started = useAppSelector(state => state.game.started)

    useEffect(() => {
        tickTimer()
        const TOTAL_CARDS = process.env.REACT_APP_TOTAL_CARDS

        if (TOTAL_CARDS) {
            setCards(initCards(TOTAL_CARDS))
        } else {
            alert('REACT_APP_TOTAL_CARDS не найден в .env')
        }
    }, [started])

    useEffect(() => {
        if (firstCardValue !== null) {
            const timer = setInterval(() => {
                dispatch(tickTimer())
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [firstCardValue])

    useEffect(() => {
        if (firstCardValue !== null && secondCardValue !== null) {
            setTimeout(() => {
                if (firstCardValue === secondCardValue) {
                    dispatch(addPoint())
                    dispatch(removeValueOfPairedCards(firstCardValue))
                }

                dispatch(resetCards())
                dispatch(resetTimer())
            }, 600)
        }
    }, [secondCardValue])

    useEffect(() => {
        const TOTAL_CARDS = process.env.REACT_APP_TOTAL_CARDS

        if (valuesOfRemoved.length.toString() === TOTAL_CARDS) {
            dispatch(win())
            dispatch(gameStop())
        }
    }, [valuesOfRemoved])

    return (
        <div className="area">
            {firstCardValue && <Timer/>}
            {won && <WinMessage/>}
            <Playground cards={cards}/>
        </div>
    )
}

export default AreaPlayground