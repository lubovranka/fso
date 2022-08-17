import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./Components/Country";

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
      axios
          .get("https://restcountries.com/v3.1/all")
          .then(res => setCountryData(res.data))
  }, [])

  const handleInput = (e) => setQuery(e.target.value);

  const countriesToShow = countryData.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  const displayCountries = () => {
    if (!countriesToShow.length) {return <p>Loading...</p>}

    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countriesToShow.length > 1) {
      return countriesToShow.map((country) => (
        <div key={country.name.common}>
          <p>{country.name.common}</p>
          <button onClick={() => setQuery(country.name.common)}>show</button>
        </div>
      ));
    } else if (countriesToShow.length === 1) {
        return <Country data={countriesToShow[0]} />
    } else {
        return <p>No matches, specify another filter</p>
    }
  };
  return (
    <>
        <form>
        find countries <input value={query} onChange={handleInput} />
        </form>
        {displayCountries()}
    </>
  );
};

export default App;
