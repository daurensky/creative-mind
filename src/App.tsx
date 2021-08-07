import React, {useEffect, useState} from 'react'
import moment from 'moment'

const TOTAL_CARDS = 18

function initCardsArray(totalCards: number) {
    const result = []
    const count = totalCards
    const side = Math.sqrt(totalCards * 2)
    let currentValue = 1
    let currentId = 1

    function shuffle<T>(array: T[]): T[] {
        return array.sort(() => Math.random() - 0.5)
    }

    for (let i = 1; i <= side; i++) {
        let row: CardRow[] = []

        for (let j = 1; j <= side; j++) {
            if (currentValue > count) {
                currentValue = 1
            }

            row.push({
                id: currentId++,
                value: currentValue++,
            })
        }

        result.push(shuffle<CardRow>(row))
    }

    return result
}

function App() {
    const [firstCardId, setFirstCardId] = useState<number | null>(null)
    const [secondCardId, setSecondCardId] = useState<number | null>(null)

    const [firstCardValue, setFirstCardValue] = useState<number | null>(null)
    const [secondCardValue, setSecondCardValue] = useState<number | null>(null)

    const [cards, setCards] = useState<CardRow[][]>([])
    const [removed, setRemoved] = useState<number[]>([])
    const [points, setPoints] = useState(0)

    const [countdown, setCountdown] = useState(5)
    const [started, setStarted] = useState(false)
    const [stopwatch, setStopwatch] = useState('00:00:00')

    const [results, setResults] = useState<{ stopwatch: string, points: number }[]>([])
    const [win, setWin] = useState(false)

    useEffect(() => {
        setCards(initCardsArray(TOTAL_CARDS))
    }, [])

    useEffect(() => {
        if (firstCardValue && secondCardValue) {
            setTimeout(() => {
                if (firstCardValue === secondCardValue) {
                    setPoints(prev => prev + 1)
                    setRemoved(prev => [...prev, firstCardValue])
                }

                resetCards()
            }, 600)
        }
    }, [secondCardValue])

    useEffect(() => {
        if (started) {
            let counter = 1

            const timer = setInterval(() => {
                setStopwatch(moment().hour(0).minute(0).second(counter++).format('HH:mm:ss'))
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [started])

    useEffect(() => {
        if (firstCardValue) {
            const timer = setInterval(() => {
                setCountdown(prev => prev - 1)
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [firstCardValue])

    useEffect(() => {
        countdown === 0 && saveResults()
    }, [countdown])

    useEffect(() => {
        if (removed.length === TOTAL_CARDS) {
            setWin(true)
            saveResults(true)
        }
    }, [removed])

    function saveResults(crown = false) {
        setResults(prev => [...prev, {stopwatch: crown ? `👑 ${stopwatch}` : stopwatch, points}])
        resetCards()
        setRemoved([])

        setStarted(false)
        setStopwatch('00:00:00')
        setPoints(0)
    }

    function handleClick(id: number, value: number) {
        if (!started) return

        if (firstCardId === null) {
            setFirstCardId(id)
            setFirstCardValue(value)
        } else if (secondCardId === null) {
            setSecondCardId(id)
            setSecondCardValue(value)
        }
    }

    function resetCards() {
        setFirstCardId(null)
        setFirstCardValue(null)
        setSecondCardId(null)
        setSecondCardValue(null)
        setCountdown(5)
    }

    function toggleStart() {
        setWin(false)
        !started ? setStarted(true) : saveResults()
    }

    return (
        <div className="container">
            <div className="header">
                <h2>{stopwatch}</h2>
                <h2>Счет: {points}</h2>
                <button onClick={toggleStart} className="start-btn">{started ? 'Стоп!' : 'Старт!'}</button>
            </div>

            <div className="wrapper">
                <div className="area">
                    <span className="countdown">{firstCardValue && countdown}</span>

                    {win && (
                        <div className="win">
                            👑 🎉 Вы выиграли!
                        </div>
                    )}

                    <table className={`playground ${win ? 'blurred' : ''}`}>
                        <tbody>
                        {cards.map((row, index) => (
                            <tr key={index}>
                                {row.map(({id, value}, index) => (
                                    <td key={index}>
                                        {!removed.includes(value) && (
                                            <div className={`card ${!started ? 'disabled' : ''}`}
                                                 onClick={() => handleClick(id, value)}>
                                                {(firstCardId === id || secondCardId === id) ? (
                                                    <img src={`/img/${value}.png`} alt="" width={60}/>
                                                ) : (
                                                    <img src={`/img/question.png`} alt="" width={60}/>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="area">
                    <table className="result">
                        <thead>
                        <tr>
                            <th>Время</th>
                            <th>Счет</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.reverse().map(({stopwatch, points}, index) => (
                            <tr key={index}>
                                <td>{stopwatch}</td>
                                <td>{points}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default App
