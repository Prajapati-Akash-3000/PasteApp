import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pastSlice'

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
})