import { useState } from 'react'

const Filter = ({ filterText, handleInputFilterTextChange }) => {
  return (
    <div>
      <label htmlFor="filter">filter shown with</label>
      <input type="text" value={filterText} onChange={handleInputFilterTextChange} />
    </div>
  )
}

const PersonForm = ({handleSubmit, newName, handleInputNameChange, newPhoneNumber, handleInputPhoneChange}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputNameChange} />
        </div>
        <div>
          number: <input value={newPhoneNumber} onChange={handleInputPhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      { filteredPersons.map(person =>
        <div key={person.id}>{person.name} {person.number}</div>
      )}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterText, setFilterText] = useState('')

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
