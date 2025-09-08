import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    
    if (persons.filter(p => p.name === newName).length > 0){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    const person = {
      name: newName
    }
    setPersons(persons.concat(person))
    setNewName('')
  }  

  const handlerNameChanged = (event) => {
    setNewName(event.target.value)        
  }




  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handlerNameChanged}/>
        </div>
        <div>
          <button type="submit">ADD</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person key={person.name} name={person.name}/>)}
      </ul>
    </div>
  )
}

export default App