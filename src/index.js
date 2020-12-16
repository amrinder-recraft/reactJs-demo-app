import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'
import * as serviceWorker from './serviceWorker'
import App from './App/App'
import { addInterceptors } from './utils/api'
import { SENTRY_APP_DSN } from './constants'
import '../node_modules/bulma/css/bulma.min.css'
import './style/index.css'

addInterceptors()

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: SENTRY_APP_DSN,
        environment: process.env.NODE_ENV,
    })
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

if (process.env.NODE_ENV === 'development') {
    serviceWorker.unregister()
} else {
    serviceWorker.register()
}
