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

export default PersonForm
