import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from "../reducers/anecdoteReducer"
import { handleNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    const votedAnecdote = anecdotes.find(a => a.id === id)
    dispatch(voteFor(id))
    dispatch(handleNotification(`you voted '${votedAnecdote.content}'`))
  }

  return (
    <div>
        {anecdotes
          .slice()
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default AnecdoteList