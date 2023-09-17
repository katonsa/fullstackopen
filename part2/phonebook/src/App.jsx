import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null); // 'success' | 'error'

  useEffect(() => {
    personService
      .getAll()
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

      personService.update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          showMessage(`${changedPerson.name} has been changed`)
        }).catch(error => {
          console.log('Error occured when update', error)
          showMessage(`Information of ${changedPerson.name} has already been removed from server`, 'error')
          setPersons(persons.filter(person => person.id !== changedPerson.id))
        })

    } else {
      const person = {
        id: persons.length + 1,
        name: newName,
        number: newPhoneNumber
      }
      
      personService.create(person)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          showMessage(`Added ${newPerson.name}`)
        })
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
      personService.deleteResource(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showMessage(`${name} has been removed`)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log('Error occured when delete', error)
          showMessage(`Information of ${name} has already been removed from server`, 'error')
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const showMessage = (message, type = 'success') => {
    setMessageType(type)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, 2500)
  }

  const filteredPersons = filterText == ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
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
