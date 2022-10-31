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
    loading: false,
    iserror: false,
  });

  useEffect(() => {
    const data = window.localStorage.getItem("WEATHER_STATE");
    if (data != null) setState(JSON.parse(data));
  }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("WEATHER_STATE", JSON.stringify(state));
  // }, [state]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  function onSearchSubmit(country, city) {
    try {
      setState({ ...state, loading: true, iserror: false });
      const url = "http://localhost:8081/api/v1.0/weather";
      const config = {
        params: { country: country, city: city },
        headers: { accept: "application/json" },
      };
      axios.get(url, config).then((response) => {
        console.log(JSON.stringify(response.data));
        const message = JSON.parse(JSON.stringify(response.data)).message;
        alert(
          "Weather is " +
            message +
            "...but wont go into local storage for some reason"
        );
        setState(
          JSON.stringify({
            ...state,
            message: message,
            loading: false,
            iserror: false,
          })
        );
      });
    } catch (error) {
      console.log(error.message);
      setState({
        ...state,
        message: error.message,
        loading: false,
        iserror: true,
      });
    }
  }

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
