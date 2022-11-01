import React from "react";
import { useEffect } from "react";

const WeatherForm = (props) => {
  const countryRef = React.createRef();
  const cityRef = React.createRef();
  const messageRef = React.createRef();

  useEffect(() => {
    const data = window.localStorage.getItem("WEATHER_DATA");
    if (data != null) {
      const weatherData = JSON.parse(data);
      countryRef.current.value = weatherData.country ?? "";
      cityRef.current.value = weatherData.city ?? "";
      messageRef.current.innerHTML = "";
      if (weatherData.country && weatherData.city)
        messageRef.current.innerHTML = weatherData.message;
    }
  });

  return (
    <form>
      <h1 className="page-heading">What Is The Weather Doing?</h1>
      <br />
      <h2>
        <input
          type="text"
          placeholder="Enter Country Name"
          required
          name="country"
          ref={countryRef}
        />
      </h2>
      <h2>
        <input
          type="text"
          placeholder="Enter City Name"
          required
          name="city"
          ref={cityRef}
        />
      </h2>
      <br />
      <span>
        <button
          onClick={() =>
            props.onSearchClick(
              countryRef?.current.value,
              cityRef?.current.value
            )
          }
        >
          Find Out
        </button>
      </span>
      <br />
      <br />
      <h2>
        <label name="message" ref={messageRef}>
          {props.weatherData.message}
        </label>
      </h2>
    </form>
  );
};

export default WeatherForm;
