import { useState } from 'react'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { useEffect } from 'react'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchNumbers, setSearchNumbers] = useState('')

  const hook = () => {
    phonebookService.getNumbers().then(initialNumbers=>{
      setPersons(initialNumbers)
    })
  }

  useEffect(hook, [])

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    const repeated = persons.find(person => person.name === newName)
    if (repeated) {
      window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      updateNumber(newName, personObject)
      return
    }
  
    phonebookService.createNumber(personObject).then(returnedNumber => {
      setPersons(persons.concat(returnedNumber))
      setNewName('')
      setNewNumber('')
    })

  }

  const updateNumber =(newName, personObject) => {
    const personToUpdate = persons.find(person => person.name === newName)
    phonebookService.updateNumber(personToUpdate.id, personObject).then((updatedNumber) => {
      setPersons(persons.map(person => person.id != personToUpdate.id? person : updatedNumber))
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchNumbers = (event) => {
    setSearchNumbers(event.target.value)
  }

  const numbersToShow = !searchNumbers
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchNumbers.toLowerCase()))

  const handleDelete = (id) => {
    const personDeleted = persons.find(person=>person.id === id)
    if (window.confirm(`Delete ${personDeleted.name} ?`)) {
      phonebookService.deleteNumber(id).then(()=>{
        setPersons(persons.filter(person=>person.id !== id))
      })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchNumbers} onChange={handleSearchNumbers} />
      <h2>add a new</h2>
      <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons numbersToShow={numbersToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App