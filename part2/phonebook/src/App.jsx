import { useState, useEffect } from 'react'
import services from './services/services'

import Persons from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  
  useEffect(()=> {
    services
      .getAll()
      .then(p => {
        setPersons(p)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.filter(p => p.name === newName).length > 0){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    const person = {
      name: newName,
      number: newNumber
    }
    services
      .create(person)
      .then(p => setPersons(persons.concat(p)))
    
    setNewName('')
    setNewNumber('')
  }  

  const handlerNameChanged = (event) => {
    setNewName(event.target.value)        
  }

  const handlerNumberChanged = (event) => setNewNumber(event.target.value)
  const handlerFilterChanged = (event) => setFilterName(event.target.value)

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handlerFilterChanged}/>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} valueName={newName} valueNumber={newNumber} onChangeName={handlerNameChanged} onChangeNumber={handlerNumberChanged}/>
      <h2>Numbers</h2>
      <Persons persons={personsFiltered}/>
    </div>
  )
}

export default App