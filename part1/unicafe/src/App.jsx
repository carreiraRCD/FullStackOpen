import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const Counter = ({counter, text}) => <p>{text} {counter}</p>


const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)

  const clickedGood = () => {
    setClicks({...clicks, good: clicks.good + 1})
    setAll(all+1)
    setAvg(avg+1)
  }

  const clickedNeutral = () => {
    setClicks({...clicks, neutral: clicks.neutral + 1})
    setAll(all+1)
  }

  const clickedBad = () => {
    setClicks({...clicks, bad: clicks.bad + 1})
    setAll(all+1)
    setAvg(avg-1)
  }


  return(
    <div>
      <Title text='Give feedback'/>
      <Button onClick={clickedGood} text='Good'/>
      <Button onClick={clickedNeutral} text='Neutral'/>
      <Button onClick={clickedBad} text='Bad'/>
      <Title text='Stadistics'/>
      <Counter counter={clicks.good} text='Good: '/>
      <Counter counter={clicks.neutral} text='Neutral: '/>
      <Counter counter={clicks.bad} text='Bad: '/>
      <Counter counter={all} text='All: '/>
      <Counter counter={avg/3} text='Avg: '/>
      <Counter counter={(clicks.good/all)*100 +'%'} text='Good percent'/>
    </div>
  )
  
}

export default App
