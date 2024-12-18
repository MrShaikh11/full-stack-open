import axios from "axios";
import { useState, useEffect } from "react";
const Display = ({ countries }) => {
  const [weather, setWeather] = useState();
  const API_KEY = import.meta.env.VITE_SOME_KEY;
  //   console.log("" + countries.capital);
  const getURL = `https://api.openweathermap.org/data/2.5/weather?q=${countries.capital}&appid=${API_KEY}&units=metric`;
  useEffect(() => {
    axios.get(getURL).then((response) => {
      setWeather(response.data);
    });
  }, []);

  return (
    <div>
      <h1>{countries.name.common}</h1>
      <p>
        {countries.capital}
        area {countries.area}
      </p>
      <div>
        <p>
          <b>Languages</b>
        </p>
        <ul>
          {Object.values(countries.languages).map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
      <img style={{ width: "300px" }} src={countries.flags.png} />
      <h1>Weather in {countries.capital}</h1>
      <p>temperature {weather?.main.temp} Celcius</p>
      <p>wind {weather?.wind.speed} m/s</p>
    </div>
  );
};

export default Display;
