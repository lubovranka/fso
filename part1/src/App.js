const Header = props => (
  <h1>{props.course}</h1>
)

// const Part = props => (
//   <p>{props.part} {props.exercises}</p>
// )

// const Content = props => {
//   const {part1, part2, part3} = props.parts
//   const {exercises1, exercises2, exercises3} = props.exercises

//   return (
//     <div>
//       <Part part={part1} exercises={exercises1}/>
//       <Part part={part2} exercises={exercises2}/>
//       <Part part={part3} exercises={exercises3}/>
//     </div>
//   )
// }

const Part = props => (
  <p>{props.name} {props.exercises}</p>
)

const Content = props => {
  const [exercises] = props.exercises
  console.log(exercises)
  return (
    <div>
      {exercises.map(exercise => <Part name={exercise.name} exercises={exercise.exercises}/>)}
    </div>
  )
}

const Total = props => {
  const numOfExercises = props.exercises[0].reduce((total, num) => total + num.exercises, 0)
  return (
    <p>Number of exercises {numOfExercises}</p>
  )
}

const App = () => {
  // const-definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content exercises={[course.parts]} />
      <Total exercises={[course.parts]}/>
    </div>
  )
}


export default App