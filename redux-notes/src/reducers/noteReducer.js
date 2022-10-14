import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find((n) => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }
      return state.map((note) => (note.id !== id ? note : changedNote))
    },
    addNote(state, action) {
      state.push(action.payload)
      // return [...state.notes, action.payload]
    },
    setNotes(state, action) {
      return action.payload 
    }
  },
})

export const { toggleImportanceOf, addNote, setNotes } = noteSlice.actions

export const initialzeNotes = () => { 
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNote(content)
    dispatch(addNote(newNote))
  }
}

export const generateId = () => Number((Math.random() * 1000000).toFixed(0))


export default noteSlice.reducer
