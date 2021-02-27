import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Pokedex from './component/pokedex/Pokedex'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Pokedex}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
