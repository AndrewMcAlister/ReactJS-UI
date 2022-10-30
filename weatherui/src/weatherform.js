import React from "react";
import { useState } from "react";
import { useRef, useEffect } from "react";
import axios from "axios";

const WeatherForm = () => {
  let countryInput = React.createRef();
  let cityInput = React.createRef();
  let messageRef = React.createRef();

  const [message, setMessage] = useState("No Weather Yet");

  const onSearchSubmit = async (country, city) => {
    console.log(country + " " + city);
    const response = axios.get("http://localhost:8081/api/v1.0/weather", {
      params: { country, city },
      headers: {
        Accept: "text/plain",
      },
    });
    console.log(await response.data.result.data);
    setMessage(response.data.result);
    messageRef.current.InnerHTML = message;
  };

  return (
    <form>
      <h1 className="Header">Weather</h1>
      <h2>
        <input
          type="text"
          placeholder="Enter Country Name"
          required
          ref={countryInput}
        />
      </h2>
      <h2>
        <input
          type="text"
          placeholder="Enter City Name"
          required
          ref={cityInput}
        />
      </h2>
      <h2 ref={messageRef}>{message}</h2>
      <span>
        <button
          onClick={() =>
            onSearchSubmit(countryInput.current.value, cityInput.current.value)
          }
        >
          Go!
        </button>
      </span>
    </form>
  );
};

export default WeatherForm;
