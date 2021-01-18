import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.handle}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)

  const addGood = () => {
    setGood(good + 1)
    setPos((good+1)/((good+1)+neutral+bad))
    setAvg((good+1-bad)/((good+1)+neutral+bad))
  }
  const addNeutral = () => {
    setNeutral(neutral + 1)
    setPos(good/(good+(neutral+1)+bad))
    setAvg((good-bad)/(good+(neutral+1)+bad))
  }
  const addBad = () => {
    setBad(bad + 1)
    setPos(good/(good+neutral+(bad+1)))
    setAvg((good-bad-1)/(good+neutral+(bad+1)))
  }

  if(good + neutral + bad === 0) {
    return (
      <div>
        <h1>Give feedback</h1> 
        <Button handle={addGood} text="good"/>
        <Button handle={addNeutral} text="neutral"/>
        <Button handle={addBad} text="bad"/>
        <h1>Statistics</h1> 
        <p>No feedback given</p>   
      </div>
    )
  } else {

  return (
    <div>
      <h1>Give feedback</h1> 
      <Button handle={addGood} text="good"/>
      <Button handle={addNeutral} text="neutral"/>
      <Button handle={addBad} text="bad"/>
      <h1>Statistics</h1> 
      <table>
        <tbody>
        <Statistics text = "good" value = {good}/>
        <Statistics text = "neutral" value = {neutral}/>
        <Statistics text = "bad" value = {bad}/>
        <Statistics text = "all" value = {good + neutral + bad}/> 
        <Statistics text = "average" value = {avg}/>
        <Statistics text = "positive" value = {100*pos + " %"}/>
        </tbody>
      </table>
    </div>
  )
}
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)