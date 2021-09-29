import React from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'


const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)   
}

const deletePerson = (id) => {
    console.log(`${baseUrl}/${id}`)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


export default {getPersons, createPerson, update, deletePerson}