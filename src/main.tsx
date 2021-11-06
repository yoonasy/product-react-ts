import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import Router from "./router";
import { Provider } from "react-redux";
import { store } from "./store";
import init from './utils/init'

init(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={ store }>
        <Router />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
})
