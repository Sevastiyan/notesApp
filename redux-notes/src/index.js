import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'

import App from './App'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

store.subscribe(()=> console.log(store.getState()))
store.dispatch(filterChange('ALL'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)