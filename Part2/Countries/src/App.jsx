import axios from 'axios'
import { useState, useEffect } from 'react'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const getCountries = () => {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data)
          setFilteredCountries(response.data) 
        })
    }
    getCountries()
  }, [])

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredCountries(filtered)
  }, [search, countries]) 

  const handleSearch = (event) => {
    setSearch(event.target.value) 
  }

  const showCountries = () => {
    if (search.length === 0) {
      return null
    } else if (filteredCountries.length > 10) {
      return 'Too many matches, specify another filter'
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h2>languages</h2>
          <ul>
            {Object.values(country.languages).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
          <h2>Weather in {country.capital}</h2>
          {showWeather(country.capital)}
          {weather && (
            <div>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather" />
            <p>wind {weather.wind.speed} m/s</p>
          </div>
          )}
        </div>
      )
    } else {
      return filteredCountries.map(country => (
        <div key={country.name.common}>{
          country.name.common}
          <button onClick={() => setSearch(country.name.common)}>show</button>
          </div>
      ))
    }
  }

  const showWeather = (capital) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }

  return (
    <div>
      <form>
        <label htmlFor="search">find countries</label>
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={handleSearch} 
        />
      </form>
      <div id='countries'>
        {showCountries()}
      </div>
    </div>
  )
}

export default App
