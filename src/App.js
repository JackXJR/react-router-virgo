import React from 'react'
// import Router from './router/Router'
import { Router } from 'react-router-virgo'
import './index.css'
import { RouterConfig } from './RouterConfig'

function App() {
  return <Router routerConfig={RouterConfig} />
}

export default App
