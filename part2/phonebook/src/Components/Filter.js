const Filter = ({ filter, handleNewFilter }) => (
  <div>
    filter shown with: <input value={filter} onChange={handleNewFilter} />
  </div>
);

export { Filter };
