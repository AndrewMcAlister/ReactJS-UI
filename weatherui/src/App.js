import React from "react";
import WeatherForm from "./weatherform";
import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

var weatherData = { country: "", city: "", message: "" };

const App = () => {
  useEffect(() => {
    const data = window.localStorage.getItem("WEATHER_DATA");
    if (data != null) weatherData = JSON.parse(data);
  });

  const saveWeatherData = (country, city, message) => {
    window.localStorage.setItem(
      "WEATHER_DATA",
      JSON.stringify({
        ...weatherData,
        country: country,
        city: city,
        message: message,
      })
    );
  };

  function dealWithResult(message) {
    alert(message);
    saveWeatherData(weatherData.country, weatherData.city, message);
  }

  async function onSearchSubmit(country, city) {
    try {
      saveWeatherData(country, city, "");
      const url = "http://localhost:8081/api/v1.0/weather";
      const config = {
        params: { country: country, city: city },
        headers: { accept: "application/json" },
      };
      await axios.get(url, config).then((response) => {
        const message = JSON.parse(JSON.stringify(response.data)).message;
        dealWithResult(message);
      });
    } catch (error) {
      console.log(error.message);
      window.localStorage.setItem("WEATHER_ERROR", error.message);
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
                weatherData={weatherData}
                onSearchClick={onSearchSubmit}
              />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
