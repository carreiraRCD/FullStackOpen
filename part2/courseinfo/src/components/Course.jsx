const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map((part)=> <Part key = {part.id} part={part}/>)}
    </>
  )
}

const Part = ({part}) => {
    return(
        <p key={part.id}>{part.name} {part.exercises}</p>
    )
}

const TotalEx = ({total}) => {
    return(
        <p>Total of {total} exercises</p>
    )
}



const Course = ({course}) => {
    const totalEx = course.parts.reduce((sum,aux)=>sum+aux.exercises,0)

    return (
    <div>
      <Header text={course.name} />
      <Content parts = {course.parts} />
      <TotalEx total = {totalEx}/>
    </div>
  )
}


export default Course