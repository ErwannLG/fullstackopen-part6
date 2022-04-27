import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state = action.payload
      return state
    },
    removeNotification: (state) => {
      state = initialState
      return state
    }
  }
})

export const { setNotification } = notificationSlice.actions

export const handleNotification = (message, time) => {
  return dispatch => {
    dispatch(setNotification(message))
    const timer = setTimeout(() => {
      dispatch(setNotification(initialState))
    }, time)
    return () => clearTimeout(timer)
  }
}

export default notificationSlice.reducer