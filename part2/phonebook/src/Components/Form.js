const Form = ({ data }) => (
  <form onSubmit={data.addPerson}>
    <div>
      <h2>Add a new person</h2>
      <div>
        name: <input value={data.newName} onChange={data.handleNewName} />
      </div>
      <div>
        number: <input value={data.newNumber} onChange={data.handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </div>
  </form>
);

export { Form };
