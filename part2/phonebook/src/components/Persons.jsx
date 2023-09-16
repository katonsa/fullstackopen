const Person = ({person, handleDeleteClick}) => {
  return (
    <div>{person.name} {person.number} <button onClick={() => handleDeleteClick(person.id, person.name)}>delete</button></div>
  )
}

const Persons = ({ filteredPersons, handleDeleteClick }) => {
  return (
    <div>
      { filteredPersons.map(person =>
        <Person key={person.id} person={person} handleDeleteClick={handleDeleteClick} />
      )}
    </div>
  )
}

export default Persons
