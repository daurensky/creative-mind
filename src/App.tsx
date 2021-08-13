import React from 'react'
import Header from './components/Header'
import AreaPlayground from './components/AreaPlayground'
import AreaResult from './components/AreaResult'

function App() {
    return (
        <div className="container">
            <Header/>

            <div className="wrapper">
                <AreaPlayground/>
                <AreaResult/>
            </div>
        </div>
    )
}

export default App
