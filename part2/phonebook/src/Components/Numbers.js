import pbService from "../services/pbService";

const Numbers = ({ peopleToShow, setPersons }) => {
  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      pbService.deleteNumber(id)
      const newPeople = peopleToShow.filter(person => person.id !== id)
      setPersons(newPeople)
    }
  }

  return (
  <div>
    <h2>Numbers</h2>
    {peopleToShow.map((person) => (
      <div key={person.name}>
        <p>
          {person.name} {person.number}
        </p><button onClick={() => handleDelete(person.name,person.id)}>delete</button>
      </div>
    ))}
  </div>
)};

export { Numbers };
