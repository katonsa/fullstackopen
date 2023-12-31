import { useState } from 'react'

const Anecdote = ({text, votes}) => {
  return (
    <>
      <div>
        {text}
      </div>
      <div>
        has {votes} votes
      </div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)
  
  const getRandomInt = (max) => Math.floor(Math.random() * max)

  const mostVotedItem = (nVotes) => {
    let highestIndex = 0;
    let highestValue = nVotes[0];
    for (let i = 1; i < nVotes.length; i++) {
      if (nVotes[i] > highestValue) {
        highestValue = nVotes[i];
        highestIndex = i;
      }
    }
    setMostVoted(highestIndex)
  }

  const handleClickVote = () => {
    const newVotesValue = [...votes] // ... create new array to not referencing it [...votes] != votes
    newVotesValue[selected] += 1
    setVotes(newVotesValue)
    mostVotedItem(newVotesValue)
  }

  const handleClickNext = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
        <div>
          <button onClick={handleClickVote}>vote</button>
          <button onClick={handleClickNext}>next anecdote</button>
        </div>
      </div>
      
      <div>
        <h2>Anecdote with most votes</h2>
        <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
      </div>
    </div>
  )
}

export default App
