import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import services from './services/services'

function App() {

  const [countries, getCountries] = useState([])
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    services
      .getAll()
      .then(c => getCountries(c))
  }, [])

  const handlerFilterChanged = (event) => setFilterName(event.target.value)
  
  const countriesFiltered = countries.filter(c => {
    const name = c.name.common.toLowerCase();
    const filter = filterName.toLowerCase();

    // Si hay coincidencia exacta, devolvemos solo ese país
    if (name === filter) {
      return true;
    }

    // Si no hay coincidencia exacta con ningún país, mostramos coincidencias parciales
    const hasExact = countries.some(
      country => country.name.common.toLowerCase() === filter
    );

    if (!hasExact && name.includes(filter)) {
      return true;
    }

    return false;
  });


  return (
    <>
      <div>
        <h1>COUNTRIES INFO</h1>
        <Filter value={filterName} onChange={handlerFilterChanged}/>
        <Countries countries={countriesFiltered}/>
      </div>
    </>
  )
}

export default App
