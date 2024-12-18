import { useEffect, useState } from "react";
import axios from "axios";
import Display from "./components/Display";
function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    console.log("Fetching data...");

    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setData(response.data);
        setFilter(response.data);
      });
  }, []);

  const handleShow = (e) => {
    if (selected === null || e.name != selected.name) {
      if (show === true) {
        setSelected(e);
      } else {
        setShow(!show);
        setSelected(e);
      }
    } else {
      setShow(!show);
    }
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilter(
      data.filter((item) =>
        item.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <>
      find countries <input value={search} onChange={handleSearch} />
      {data === filter ? (
        data.map((country, i) => {
          return <li key={i}>{country.name.common}</li>;
        })
      ) : filter.length >= 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filter.length === 1 ? (
        <Display countries={filter[0]} />
      ) : (
        <>
          {filter.map((country, i) => {
            return (
              <li key={i}>
                {country.name.common}

                <button onClick={() => handleShow(country)}>
                  {selected?.name !== country.name || show === false
                    ? "show"
                    : "not-show"}
                </button>
              </li>
            );
          })}
          {show === true ? (
            <Display countries={selected} />
          ) : (
            <p>press show to display</p>
          )}
        </>
      )}
      {/* { */}
    </>
  );
}

export default App;
