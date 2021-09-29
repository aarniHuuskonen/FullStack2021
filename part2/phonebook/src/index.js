import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './components/personService'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [style, setStyle] = useState("added")

  const Notification = ({message, style}) => {
    if(message === null) {
      return null
    }
    return (
      <div className={style}>
        {message}
      </div>
    )
  }

  useEffect(() => {
    personService
    .getPersons()
    .then(initialPersons => [
      setPersons(initialPersons)
    ])
  }, [])

  const personsToShow = persons
                        .filter(person => 
                          person.name.toLowerCase().includes(filter.toLowerCase(),0))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if(persons.find(person  => person.name === newName)) {
      if(window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
        const changedPerson = persons.find(n => n.name === newName)
        const changedObject = {...changedPerson, number: newNumber}
        const Id = changedObject.id
        personService
        .update(Id, changedObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== Id ? person : response))
          setNewName('')
          setNewNumber('')
        })
          setStyle("added")
          setAddedMessage(
            `Updated ${changedObject.name}` 
          )
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
          
        
      } else {
        setNewName('')
        setNewNumber('')
      }

    } else {
      personService
      .createPerson(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
      setStyle("added")
      setAddedMessage(
        `Added ${personObject.name}` 
      )
      setTimeout(() => {
        setAddedMessage(null)
      }, 5000)
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFiltering = (event) => {
    setFilter(event.target.value)
  }

  const handleDeletion = (id) => {
    const personDelete = persons.filter(person => person.id === id)
    personService
    .deletePerson(id)
    .then(response => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      setStyle("error")
      setAddedMessage(
        `Information of '${personDelete.name}' was already removed from server`
      )
      setTimeout(() => {
        setAddedMessage(null)
      }, 5000) 
      setNewName('')
      setNewNumber('')
  })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {addedMessage} style = {style}/>
      <Filter filter = {filter} handleFiltering = {handleFiltering}/>
      <h2>Add new</h2>
      <PersonForm addPerson = {addPerson} 
       newName = {newName}
       handleNameChange = {handleNameChange}
       newNumber = {newNumber}
       handleNumberChange = {handleNumberChange}
       />
      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow} handleDeletion = {handleDeletion}/>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))