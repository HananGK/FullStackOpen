import { useState } from 'react'

const Button = ({ onClick, name }) => <button onClick={onClick}>{name}</button>

const AllButtons = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <div>
      <Button onClick={handleGood} name={'good'} />
      <Button onClick={handleNeutral} name={'neutral'} />
      <Button onClick={handleBad} name={'bad'} />
    </div>
  )
}

const Statistic = ({ name, number }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>
  )
}

const AllStatistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic name={'good'} number={good} />
          <Statistic name={'neutral'} number={neutral} />
          <Statistic name={'bad'} number={bad} />
          <Statistic name={'all'} number={all}/>
          <Statistic name={'average'} number={average} />
          <Statistic name={'positive'} number={positive + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const all = good + neutral + bad

  //good*1 + neutral*0 + bad*(-1) -> good - bad
  const average = (good - bad) / all

  const positive = (good / all) * 100

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <AllButtons handleGood={handleGood} handleNeutral={handleNeutral} handleBad={handleBad}/>
      </div>
      <div>
        <h1>statistics</h1>
        <AllStatistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
      </div>
    </div>
  )
}

export default App
