import { useState, useEffect } from "react";
import axios from "axios";
import { Filter } from "./Components/Filter";
import { Form } from "./Components/Form";
import { Numbers } from "./Components/Numbers";
import pbService from "./services/pbService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    pbService
      .getAll()
      .then(initialPeople => setPersons(initialPeople))
  }, []);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleNewFilter = (e) => {
    setFilter(e.target.value);
  };

  const peopleToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const addPerson = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      const [personToUpdate] = persons.filter(person => person.name === newName)
      if (window.confirm(`${personToUpdate.name} is already added to the phonebook, replace old number with a new one?`)) {
    
        pbService.updateNumber(personToUpdate, newNumber)
          .then(() => {
            pbService.getAll().then(res => setPersons(res))
          })
      }
    } else if (persons.some((person) => person.number === newNumber)) {
      alert(`${newNumber} is already added to the phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      pbService.create(newPerson)
        .then(res => {
          setPersons(persons.concat(res))
          setNewName("")
          setNewNumber("")
        })

    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleNewFilter={handleNewFilter} />
      <Form
        data={{ newNumber, handleNewNumber, newName, handleNewName, addPerson }}
      />
      <Numbers peopleToShow={peopleToShow} setPersons={(newPersons) => setPersons(newPersons)}/>
    </div>
  );
};

export default App;
