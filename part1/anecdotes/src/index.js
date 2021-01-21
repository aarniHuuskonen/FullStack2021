import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => {
  return(
    <div>
      <p>{props.anecdotes[props.num]}</p>
      <p>has {props.votes[props.num]} votes</p>
    </div>
  )
}

const findMax = (props) => {
  return(
    Math.max(props.votes)
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState([0, 0, 0, 0, 0, 0])
  const [maxVote, setMax] = useState(0)
  const [indexMax, setIndexMax] = useState(0)

  const newVal = () => {
    const v = Math.random() * 6
    setSelected(Math.floor(v))  
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
    setMax(Math.max(copy))
    setIndexMax(copy.indexOf(Math.max(...copy)))
  }

  return (
    <div>
      <h1>Anectdote of the day</h1>
      <Display anecdotes = {props.anecdotes} num = {selected} votes = {votes}/> 
      <button onClick = {vote}>vote</button>
      <button onClick = {newVal}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Display anecdotes = {props.anecdotes} num = {indexMax} votes = {votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)