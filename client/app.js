import React from 'react'

import {Navbar, Landing} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      { /*<Navbar />*/}
      <Routes />
      <Landing />
    </div>
  )
}

export default App
