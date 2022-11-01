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

  const dealWithResult = (message) => {
    saveWeatherData(weatherData.country, weatherData.city, message);
  };

  const onSearchSubmit = async (country, city) => {
    try {
      saveWeatherData(country, city, ""); //clear last message
      const url = "http://localhost:8081/api/v1.0/weather";
      const config = {
        params: { country: country, city: city },
        headers: { accept: "application/json" },
      };
      axios.get(url, config).then((response) => {
        const message = JSON.parse(JSON.stringify(response.data)).message;
        dealWithResult(message);
      });
    } catch (error) {
      console.log(error.message);
      dealWithResult(error.message); //display the error message
    }
  };

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
