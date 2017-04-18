import './libs'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from './store'
import ApplicationNode from './ApplicationNode'

const reduxState = window.__INITIAL_STATE__ || undefined
const store = configureStore(reduxState)

const browserHistory = useRouterHistory(createHashHistory)({ queryKey: false })
const history = syncHistoryWithStore(browserHistory, store)
const appNode = document.getElementById('application')

render(
  <AppContainer>
    <ApplicationNode store={store} history={history} />
  </AppContainer>,
  appNode
)

// For hot reloading of react components
if (process.env.NODE_ENV !== 'production' && module && module.hot) {
  module.hot.accept('./ApplicationNode', () => {
    const NextApp = require('./ApplicationNode').default
    render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      appNode
    )
  })
}
