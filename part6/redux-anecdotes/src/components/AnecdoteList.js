import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    const query = state.filter.toLowerCase()
    const baseSorted = state.anecdotes.map(anecdote => anecdote).sort((a, b) => b.votes - a.votes)

    if (query === '') {
      return baseSorted
    }

    return baseSorted.filter(anecdote => anecdote.content.toLowerCase().includes(query))
  })

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList