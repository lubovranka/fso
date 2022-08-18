const Filter = ({ nameFilter, setFilter}) => {
    return (
        <div>
            filter shown with <input value={nameFilter} onChange={setFilter} />
        </div>
    )
}

export default Filter