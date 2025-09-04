

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map((part) => <p key={part.id}>{part.name} {part.exercises}</p>)}
    </>
  )
}


const Course = ({course}) => {
    return (
    <div>
      <Header text={course.name} />
      <Content parts = {course.parts} />
      <p>Total of {course.parts.reduce((sum, aux) => sum+aux.exercises,0)} exercises</p>
    </div>
  )
}


export default Course