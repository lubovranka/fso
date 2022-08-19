import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import { useState, useEffect } from "react";
import pbServices from "./services/pbServices";
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [notificationData, setNotificationData] = useState(null)

  useEffect(() => {
    pbServices.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handlePersonFieldChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handlePersonFieldSubmit = () => {
    pbServices
      .create(newPerson)
      .then((res) => {
        setPersons(persons.concat(res))
        createNotification(`${newPerson.name} added to the phonebook`, "success")
      })
      .catch(err => {
        createNotification(`${err.response.data.error}`, "error")
      });
  };

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`))
    pbServices.deletePerson(id).then((res) => setPersons(res));
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const createNotification = (message, type) => {
    setNotificationData({ message, type })

    setTimeout(() => {
      setNotificationData(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification data={notificationData} />
      <Filter
        nameFilter={nameFilter}
        setFilter={(e) => setNameFilter(e.target.value)}
      />
      <h2>Add a new number</h2>
      <PersonForm
        newPerson={newPerson}
        setNewPerson={handlePersonFieldChange}
        submit={handlePersonFieldSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
