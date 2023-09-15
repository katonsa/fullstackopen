import { useEffect, useState } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.findIndex(person => person.name === newName) > -1) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const addNewPerson = persons.concat({ id: persons.length + 1, name: newName, number: newPhoneNumber});
    setPersons(addNewPerson)
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
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App
