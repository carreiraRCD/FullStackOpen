import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>
const Display = ({text}) => <p>{text}</p>
const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

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

  const randomNumber = () => {
    const num = Math.floor(Math.random() * 7)
    setSelected(num)
  }

  const [votes, setNewVote] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const voteFor = () => {
    const copy = [...votes]
    copy[selected] += 1
    setNewVote(copy)
    setMostVotes(copy.indexOf(Math.max(...copy)))
  }

  return (
    <div>
      <Title text = "Anecdote of the day"/>
      <Display text = {anecdotes[selected]}/>
      <Display text = {"Has "+votes[selected]+" votes"}/>
      <Button text="Vote" onClick={voteFor}/>
      <Button text="Next anecdote" onClick={randomNumber}/> 
      <Title text = "Anecdote with most votes"/>
      <Display text = {anecdotes[mostVotes]}/>
      <Display text = {"Has "+votes[mostVotes]+" votes"}/>
    </div>
  )
}

export default App