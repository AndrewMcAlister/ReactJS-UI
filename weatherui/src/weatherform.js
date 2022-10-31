import React from "react";

const countryRef = React.createRef();
const cityRef = React.createRef();

const WeatherForm = (props) => {
  return (
    <form>
      <h1 className="page-heading">What Is The Weather Doing?</h1>
      <br />
      <h2>
        <input
          type="text"
          placeholder="Enter Country Name"
          required
          value={props.state.country}
          onChange={(e) => props.onInputUpdate(e)}
          name="country"
          ref={countryRef}
        />
      </h2>
      <h2>
        <input
          type="text"
          placeholder="Enter City Name"
          required
          value={props.state.city}
          onChange={(e) => props.onInputUpdate(e)}
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
        <label name="message">{props.state.message}</label>
      </h2>
    </form>
  );
};

export default WeatherForm;
