const Filter = ({ filterText, handleInputFilterTextChange }) => {
  return (
    <div>
      <label htmlFor="filter">filter shown with</label>
      <input type="text" value={filterText} onChange={handleInputFilterTextChange} />
    </div>
  )
}

export default Filter
