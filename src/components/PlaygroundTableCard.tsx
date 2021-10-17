import React from 'react'
import useAppDispatch from '../hooks/useAppDispatch'
import {setFirstId, setFirstValue, setSecondId, setSecondValue} from '../store/cardsSlice'

function PlaygroundTableCard({id, value, firstId, secondId, gameStarted, cardRemoved}: PlaygroundCard) {
    const dispatch = useAppDispatch()

    function handleClick() {
        if (!gameStarted) return

        if (firstId === null) {
            dispatch(setFirstId(id))
            dispatch(setFirstValue(value))
        } else if (secondId === null && firstId !== id) {
            dispatch(setSecondId(id))
            dispatch(setSecondValue(value))
        }
    }

    return (
        <td>
            {!cardRemoved && (
                <div className={`card ${!gameStarted ? 'disabled' : ''}`}
                     onClick={handleClick}>
                    {(firstId === id || secondId === id) ? (
                        <img src={`./img/${value}.png`} alt={value.toString()} width={60}/>
                    ) : (
                        <img src={`./img/question.png`} alt="Unselected card" width={60}/>
                    )}
                </div>
            )}
        </td>
    )
}

export default PlaygroundTableCard