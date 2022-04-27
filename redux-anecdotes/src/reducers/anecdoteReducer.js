import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // voteFor(state, action) {
    //   const id = action.payload
    //   const anecdoteToVoteFor = state.find(a => a.id === id)
    //   const addVote = {
    //     ...anecdoteToVoteFor, votes: anecdoteToVoteFor.votes + 1
    //   }
    //   return state.map(anecdote => anecdote.id !== id ? anecdote : addVote)
    // },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const id = action.payload
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.payload)
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = anecdote => {
  return async dispatch => {
    const updateVoteCount = {...anecdote, votes: anecdote.votes +1}
    const updatedAnecdote = await anecdoteService.addVote(updateVoteCount)
    dispatch(updateAnecdote(updatedAnecdote))
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer