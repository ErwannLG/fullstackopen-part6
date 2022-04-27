import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from "../reducers/anecdoteReducer"
import { handleNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = filter === ''
    ? anecdotes
    : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  const dispatch = useDispatch()

  const vote =  async (id) => {
    const votedAnecdote = anecdotes.find(a => a.id === id)
    dispatch(voteFor(votedAnecdote))
    dispatch(handleNotification(`you voted '${votedAnecdote.content}'`, 5000))
  }

  return (
    <div>
        {filteredAnecdotes
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