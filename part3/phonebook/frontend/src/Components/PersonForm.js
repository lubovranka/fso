const PersonForm = ({ newPerson, setNewPerson, submit}) => {
    return (
        <div>
            name: <input value={newPerson.name} name={"name"} onChange={e => setNewPerson(e)} /><br />
            number: <input value={newPerson.number} name={"number"} onChange={e => setNewPerson(e)} /><br />
            <button onClick={() => submit()}>add</button>
        </div>
    )
}

export default PersonForm