import React from 'react'
import ReactDOM from 'react-dom'

//Sub-components Header, Part and Content
const Header = (props) => {
    return (
      <div>
        <h2> {props.course.name} </h2>
      </div>
    )
  }

const Part = (props) => {
  return(
      props.part.name + " " + props.part.exercises
  )
}

  const Content = (props) => {
    return(
      <div>
        {props.course.parts.map(part => 
          <p key={part.id}>
            <Part part={part}/>
          </p>)}
      </div>
    )
  }

//Component Course  
const Course = ({course}) => {
    return(
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <b> total of {course.parts.reduce((a,b) => a + b.exercises, 0)} exercises </b>
        </div>
    )
}

export default Course