import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'

import App from './App'

import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'

//Todo Can be removed:
store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('ALL'))
store.dispatch(
  createNote('combineReducers forms one reducer from many simple reducers')
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
