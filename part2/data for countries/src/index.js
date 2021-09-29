import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


//Fetch weather data from api and return temperature and wind data, with icon
const WeatherData = (props) => {
  const[weather, setWeather] = useState([])
  const data = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.capital}`
  useEffect(() => { 
  axios.get(data).then(response => {
    setWeather(response.data.current)
    })
  }, [])
  return(
    <div>
      <p><b>temperature:</b> {weather.temperature} Celcius</p>
      <img src={String(weather.weather_icons)} alt="icon" height="90px" width="150px"/>
      <p><b>wind:</b> {weather.wind_speed} mph, direction {weather.wind_dir} </p>
    </div>
  )
} 


//Component for showing a single country info
const ShowOne = ({country}) => {
  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(lang => 
          <li key={lang.iso639_1}>
            {lang.name}
          </li>
          )}
      </ul>
      <img src= {String(country.flag)} alt="flag" height="90px" width="150px"/>
      <h2>Weather in {country.capital}</h2>
      <WeatherData capital={country.capital} />
    </div>
  )
}



//Component for displaying multiple country names in a mapping
//included "setFilter" handle for button operating 
const Display = ({country, setFilter}) => {
  return(
    <div style = {{ flexDirection: "row"}}>
      <span>{country.name} </span> 
      <button onClick={() => setFilter(country.name)}>show </button>
    </div>
  )
}



//Component to detect wether to show multiple, none, or a single country info
const Shown = ({countries, setFilter}) => {
  if(countries.length > 10) {
    return(
      <p>Too many matches, specify another filter</p>
    )
  } else if(countries.length === 1) {
    return(
      <ShowOne country={countries[0]}/>
    )
  } else {
    return(
      <div>
        {countries.map(country => 
          <Display key={country.alpha2Code} country={country} setFilter={setFilter}/>
        )}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase(),0))

  const handleFilter = (event) => {
    setFilter(event.target.value)
  } 

  return(
    <div>
      find countries <input
      value={filter}
      onChange={handleFilter}/>
      <Shown countries={countriesToShow} setFilter={setFilter}/> 
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
export default App