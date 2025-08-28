import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const Counter = ({counter, text}) => <p>{text} {counter}</p>
const Display = ({text}) => <p>{text}</p>

const Stadistics = ({clicks}) => {
  if (clicks.all === 0){
    return(
      <div>
        <Title text='Stadistics'/>
        <Display text = 'No feedback given'/>
      </div>
    )
  }else{
    return(
      <div>
        <Title text='Stadistics'/>
        <Counter counter={clicks.good} text='Good: '/>
        <Counter counter={clicks.neutral} text='Neutral: '/>
        <Counter counter={clicks.bad} text='Bad: '/>
        <Counter counter={clicks.all} text='All: '/>
        <Counter counter={clicks.avg/3} text='Avg: '/>
        <Counter counter={(clicks.good/clicks.all)*100 +'%'} text='Good percent'/>
      </div>
    )
  }
}


const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, all: 0, avg: 0
  })

  const clickedGood = () => {
    setClicks({...clicks, good: clicks.good + 1, all: clicks.all + 1, avg: clicks.avg + 1})
  }

  const clickedNeutral = () => {
    setClicks({...clicks, neutral: clicks.neutral + 1, all: clicks.all + 1})
  }

  const clickedBad = () => {
    setClicks({...clicks, bad: clicks.bad + 1, all: clicks.all + 1, avg: clicks.avg - 1})
  }


  return(
    <div>
      <Title text='Give feedback'/>
      <Button onClick={clickedGood} text='Good'/>
      <Button onClick={clickedNeutral} text='Neutral'/>
      <Button onClick={clickedBad} text='Bad'/>
      <Stadistics clicks={clicks}/>
    </div>
  )
  
}

export default App
