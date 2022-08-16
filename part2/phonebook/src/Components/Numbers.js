const Numbers = ({ peopleToShow }) => (
  <div>
    <h2>Numbers</h2>
    {peopleToShow.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ))}
  </div>
);

export { Numbers };
