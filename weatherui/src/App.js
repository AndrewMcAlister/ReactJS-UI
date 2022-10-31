import React from "react";
import WeatherForm from "./weatherform";
import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const [state, setState] = useState({
    country: "",
    city: "",
    message: "No Data Yet",
  });

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function onSearchSubmit(country, city) {
    try {
      const url = "http://localhost:8081/api/v1.0/weather";
      const config = {
        params: { country: country, city: city },
        headers: { accept: "application/json" },
      };
      const response = await axios.get(url, config);
      window.localStorage.setItem("Message", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const data = window.localStorage.getItem("WEATHER_STATE");
    if (data != null) setState(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("WEATHER_STATE", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <WeatherForm
                onInputUpdate={handleChange}
                onSearchClick={onSearchSubmit}
                state={state}
              />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
