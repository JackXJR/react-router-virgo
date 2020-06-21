import React from 'react'
// import { Router } from 'react-router-virgo'
import Router from './router/Router'
import { RouterConfig } from './RouterConfig'
import './index.css'

function App() {
  return <Router routerConfig={RouterConfig} />
}

export default App
