import React from 'react'
import Router from './router/Router'
import './index.css'
import { RouterConfig } from './RouterConfig'

function App() {
  return <Router routerConfig={RouterConfig} />
}

export default App
