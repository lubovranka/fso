import { useState } from "react"

const Inputs = ({handleGood, handleNeutral, handleBad}) => (
  <div>
    <h1>give feedback</h1>
    <button onClick={handleGood}>good</button>
    <button onClick={handleNeutral}>neutral</button>
    <button onClick={handleBad}>bad</button>
  </div>
)

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (!total) {
    return <p>No feedback given</p>
  }

  return (
  <div>
    <h1>statistics</h1>
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={total} />
        <StatisticsLine text="average" value={((good - bad) / total).toFixed(1)} />
        <StatisticsLine text="positive" value={`${(good / total * 100).toFixed(1)} %`} />
      </tbody>
    </table>
  </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (state, setter) => {
    return () => setter(state + 1)
  }

  return (
    <div>
      <Inputs 
        handleGood={handleClick(good, setGood)}
        handleNeutral={handleClick(neutral, setNeutral)}
        handleBad={handleClick(bad, setBad)}
        />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App