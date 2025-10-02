import { useState, useEffect } from 'react'
import services from './services/services'

import Persons from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  
  useEffect(()=> {
    services
      .getAll()
      .then(p => {
        setPersons(p)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber
    }

    if(persons.filter(p => p.name === newName && p.number === newNumber).length > 0){

      alert(`${newName} already added to phonebook with this number`)
      setNewName('')
      setNewNumber('')
      return

    }else if (persons.filter(p => p.name === newName && p.number !== newNumber).length > 0){

      const res = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      if(res){
        services
          .update(persons.find(p => p.name === newName).id, person)
          .then(returnedPerson => {
            setPersons(
            persons.map(p => p.name !== newName ? p : returnedPerson)
          )
            setSuccessMessage(`${newName} number modified`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
      }
      setNewName('')
      setNewNumber('')
      return
      
    }
    
    services
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    
    setNewName('')
    setNewNumber('')
  }
  
  const delPerson = (person) => {

    const res = window.confirm(`Delete ${person.name} ?`)
    if(res){
      services
        .del(person.id)
        .then(setPersons(persons.filter(p=>p.id!==person.id)))
    }
    else{
      console.log('No eliminar')
    }

    
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
      <Notification message={successMessage}/>
      <PersonForm onSubmit={addPerson} valueName={newName} valueNumber={newNumber} onChangeName={handlerNameChanged} onChangeNumber={handlerNumberChanged}/>
      <h2>Numbers</h2>
      <Persons persons={personsFiltered} onClicked={delPerson}/>
    </div>
  )
}

export default App