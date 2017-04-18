import React from 'react'
import { Route } from 'react-router'
import App from './components/App'
import Aframe from './components/Aframe'
import Viewer from './components/Viewer'

const routes = (
  <Route>
    <Route path="/" component={App}></Route>
    <Route path="/aframe" component={Aframe}></Route>
    <Route path="/viewer" component={Viewer}></Route>
  </Route>
)

export default routes
