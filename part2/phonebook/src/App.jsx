import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    personsService
      .getAll('http://localhost:3001/persons')
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const personIndex = persons.findIndex(person => person.name === newName)

    if (personIndex > -1) {
      const changedPerson = {...persons[personIndex], number: newPhoneNumber}
      const confirmUpdatePhoneNumber = window.confirm(`${changedPerson.name} is already added to phonebook, replace the old number with a new one?`)
      
      if (!confirmUpdatePhoneNumber) return;

      personsService.update(changedPerson.id, changedPerson)
        .then(returnedPerson => setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson)))
    } else {
      const person = {
        id: persons.length + 1,
        name: newName,
        number: newPhoneNumber
      }
      
      personsService.create(person)
        .then(newPerson => setPersons(persons.concat(newPerson)))
    }

    setNewName('')
    setNewPhoneNumber('')
  }

  const handleInputNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleInputPhoneChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleInputFilterTextChange = (event) => {
    const { value } = event.target
    setFilterText(value)
  }

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService.deleteResource(id)
        .then(() => setPersons(persons.filter(p => p.id !== id)))
    }
  }

  const filteredPersons = filterText == ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleInputFilterTextChange={handleInputFilterTextChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleInputNameChange={handleInputNameChange}
        newPhoneNumber={newPhoneNumber}
        handleInputPhoneChange={handleInputPhoneChange}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons
        filteredPersons={filteredPersons}
        handleDeleteClick={handleDeletePerson}
      />
    </div>
  )
}

export default App
