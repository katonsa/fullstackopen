import React, { useEffect, useState } from 'react' // needed this in component files
import axios from 'axios'

const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios.get(url).then(response => {
      console.log('axios response')
      setNotes(response.data)
    })
  }, [url])

  return notes
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])

  const notes = useNotes(BACKEND_URL)

  const handleClick = () => {
    setCounter(prev => prev + 1)
    setValues(prev => prev.concat(counter))
  }

  return (
    <div className='container'>
      <h1>Hello Webpack {counter} clicks</h1>
      <button onClick={handleClick}>
        press
      </button>
      <div>
        {notes.length} notes on server {BACKEND_URL}
      </div>
    </div>
  )
}

export default App