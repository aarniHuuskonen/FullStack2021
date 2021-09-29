import React from 'react'
import personService from './personService'


const Display = (props) => {
    return (
        <div>
            <p>{props.name} {props.number} 
            <button type = "button" onClick ={() => props.handleDeletion(props.id)}>delete</button> 
            </p>
        </div>
    )
}


const Persons = ({personsToShow, handleDeletion}) => {
    return(
        <div>
            {personsToShow.map(person => 
                <Display key = {person.id} id = {person.id} name = {person.name} number = {person.number} handleDeletion = {handleDeletion}></Display>
            )}
        </div>
    )
}

export default Persons