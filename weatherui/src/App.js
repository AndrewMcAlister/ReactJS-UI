import React, { useState } from "react";
import WeatherForm from "./weatherform";
import "./App.css";
import axios from "axios";

//'http://localhost:8081/api/v1.0/Weather?country=uk&city=london'

const App = () => {
  return (
    <>
      <div>
        <WeatherForm />
      </div>
    </>
  );
};

export default App;
