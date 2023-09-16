import { useEffect, useState } from "react"
import axios from 'axios'

const WeatherInfo = ({weather}) => {
  if (weather === null) return (<div><p>Loading...</p></div>)

  return (
    <div>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const Country = ({country}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (weather === null) {
      console.log(`weather is null, fetching weather for ${country.name.common}`)
      const [lat, lon] = country.capitalInfo.latlng
      const api_key = import.meta.env.OPENWEATHERMAP_APIKEY
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
        .then(response => setWeather(response.data))
        .catch(console.log)
    }

  }, [weather])

  // convert lang object key val to array of object
  const languages = Object.keys(country.languages).map(key => ({key, name: country.languages[key]}))

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <p>Capital {country.capital.join(', ')}</p>
        <p>area {country.area}</p>
      </div>
      <div>
        <h3>languages</h3>
        <ul>
          { languages.map(lang => <li key={lang.key}>{lang.name}</li>) }
        </ul>
      </div>
      <div>
        <img style={{ border: '1px solid' /* Some countries have a white section on their flag */ }} src={country.flags.png} />
      </div>
      <div>
        <h3>Weather in {country.capital[0]}</h3>
        <WeatherInfo weather={weather} />
      </div>
    </div>
  )
}

const CountryList = ({countries, handleShowCountryClick}) => {
  return (
    <div>
      {countries.map(country => 
        <div key={country.cca2}>
          {country.name.common} <button onClick={() => handleShowCountryClick(country.cca2)}>show</button>
        </div>
      )}
    </div>
  )
}

const SearchResult = ({ filteredCountries, handleShowCountryClick }) => {
  if (filteredCountries.length === 0) {
    return null
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  } else {
    return <CountryList countries={filteredCountries} handleShowCountryClick={handleShowCountryClick} />
  }
}

const FindCountries = ({ query, handleInputQueryChange }) => {
  return (
    <div>
      <label htmlFor="query">find countries</label>
      <input
        type="text"
        name="query"
        id="query"
        value={query}
        onChange={handleInputQueryChange} />
      </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState(null)
  const [message, setMessage] = useState('')

  const [query, setQuery] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    if (countries === null) {
      setMessage('Loading ...')
      // no api call when hot reloading
      console.log('fetch all countries')
      axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data)
          setMessage('Start by typing something above!')
        })
        .catch(console.log)
    }
  }, [countries])
  
  const handleInputQueryChange = (event) => {
    if (countries === null) {
      setMessage('Please wait, loading...')
      return
    }

    let query = event.target.value
    setQuery(query)

    if (query === '') {
      setMessage('Start by typing something above!')
      setFilteredCountries([])
      return;
    }

    const filteredCountries = countries.filter(country => {
      const commonName = country.name.common.toLowerCase()
      return commonName.includes(query.toLowerCase())
    })
    
    if (filteredCountries.length > 10) {
      setMessage('Too many matches, specify another filter')
      setFilteredCountries([])
      return;
    } else if (filteredCountries.length === 0) {
      setMessage('No matches')
    } else {
      setMessage('')
    }

    setFilteredCountries(filteredCountries)
  }

  const handleShowCountryClick = (cca2) => {
    const country = filteredCountries.filter(country => country.cca2 === cca2)
    setFilteredCountries(country)
  }

  return (
    <div>
      <FindCountries query={query} handleInputQueryChange={handleInputQueryChange} />
      <div>
        { message !== '' && message }
      </div>
      <SearchResult
        filteredCountries={filteredCountries}
        handleShowCountryClick={handleShowCountryClick}
      />
    </div>
  )
}
export default App
