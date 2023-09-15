import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value }) => <tr><th>{text}</th><td>{value}</td></tr>

const Statistics = (props) => {
  if (props.total === 0) {
    return <p>No feedback given</p>
  }
  
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={props.total} />
          <StatisticLine text='average' value={props.average} />
          <StatisticLine text='positive' value={`${props.positive} %`} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0.0)
  const [positive, setPositive] = useState(0.0)

  const calculateStats = ({good, neutral, bad}) => {
    // console.log({good, neutral, bad})
    const sum = good + neutral + bad
    const updatedTotal = total + 1;
    setTotal(updatedTotal)
    setAverage(sum / updatedTotal)
    // console.log('good', (good * 1.0) , 'total', updatedTotal, (good * 1.0) / (updatedTotal * 1.0))
    setPositive((good / updatedTotal) * 100.0)
  }

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    calculateStats({good: updatedGood, neutral: neutral * 0, bad: bad * -1})
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    calculateStats({good, neutral: updatedNeutral * 0, bad: bad * -1})
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    calculateStats({good, neutral: neutral * 0, bad: updatedBad * -1})
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h2>statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App
