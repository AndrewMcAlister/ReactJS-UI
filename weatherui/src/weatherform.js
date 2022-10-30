import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const WeatherForm = () => {
  const [state, setState] = useState({
    country: "",
    city: "",
    message: "No Data Yet",
  });

  useEffect(() => {
    const data = window.localStorage.getItem("WEATHER_STATE");
    if (data != null) setState(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("WEATHER_STATE", JSON.stringify(state));
  }, [state]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSearchSubmit = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1.0/weather",
        {
          params: { country: state.country, city: state.city },
          headers: {
            accept: "application/json",
          },
        }
      );
      setState({ ...state, message: response.data.data });
      window.localStorage.setItem("WEATHER_STATE", JSON.stringify(state));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <h1 className="page-heading">What Is The Weather Doing?</h1>
      <br />
      <h2>
        <input
          type="text"
          placeholder="Enter Country Name"
          required
          value={state.country}
          onChange={handleChange}
          name="country"
        />
      </h2>
      <h2>
        <input
          type="text"
          placeholder="Enter City Name"
          required
          value={state.city}
          onChange={handleChange}
          name="city"
        />
      </h2>
      <br />
      <span>
        <button onClick={() => onSearchSubmit()}>Find Out</button>
      </span>
      <br />
      <br />
      <h2>
        <label name="message">{state.message}</label>
      </h2>
    </form>
  );
};

export default WeatherForm;
