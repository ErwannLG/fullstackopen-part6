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

export const handleNotification = (message) => {
  return dispatch => {
    dispatch(setNotification(message))
    const timer = setTimeout(() => {
      dispatch(setNotification(initialState))
    }, 5000)
    return () => clearTimeout(timer)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer