import React from 'react'
import GameBar from './components/GameBar'
import Playground from './components/Playground'
import Result from './components/Result'

function App() {
    return (
        <div className="container">
            <GameBar/>

            <div className="wrapper">
                <Playground/>
                <Result/>
            </div>
        </div>
    )
}

export default App
