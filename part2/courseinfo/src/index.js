import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

// const Header = (props) => {
//   return (
//     <div>
//       <h1> {props.course} </h1>
//     </div>
//   )
// }

// const Part = (props) => {
//   return(
//     <div>
//       <p>{props.part.name} {props.part.exercises} </p>
//     </div>
//   )
// }

// const Content = (props) => {
//   return(
//     <div>
//       <Part part={props.parts[0]}/>
//       <Part part={props.parts[1]}/>
//       <Part part={props.parts[2]}/>
//     </div>
//   )
// }

// const Total = (props) => {
//   return(
//     <div>
//       <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//     </div>
//   )
// }

//Restructured App 
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <Course key={course.id} course={course}/>
      )}
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))