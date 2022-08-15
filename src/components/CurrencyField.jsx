import React from "react";
import { useState, useEffect } from "react";
// import "./Main.css";

const CurrencyField = (props) => {
  // set tokens into state so that we can easily change them
  const [token1, setToken1] = useState();
  const [token2, setToken2] = useState();

  useEffect(() => {
    // on load, add the correct tokens to the state
    if (!props.inverted) {
      setToken1(props.pair[0]);
      setToken2(props.pair[1]);
    } else {
      setToken1(props.pair[1]);
      setToken2(props.pair[0]);
    }
  }, [props.inverted, props.pair, token1, token2]); // needs these parameters to not keep reloading

  // getPrice function passing required parameters
  const getPrice = (inputAmount, pair, inverted) => {
    props.getSwapPrice(inputAmount, props.pair, props.inverted);
  };

  return (
    <div className="row currencyInput">
      <div className="col-md-12 numberContainer">
        {props.loading ? ( // if loading, make the input display a loading spinner
          <div className="spinnerContainer">
            <props.spinner />
          </div>
        ) : (
          // else display input field (if input)
          <div className="inp-item">
            <input
              id="Input-text"
              type="number"
              className={props.field === "input" ? "inputField" : "outputField"}
              placeholder="0.0"
              value={props.value}
              onBlur={
                (e) =>
                  props.field === "input"
                    ? getPrice(e.target.value, token1)
                    : null // if the field is the input field (ie the first), call get price when the user clicks away
              }
              onKeyDown={(e) =>
                props.field === "input" && e.key === "Enter"
                  ? getPrice(e.target.value, token1)
                  : null
              }
            />
          </div>
        )}
      </div>
      <div className="col-md-12 tokenContainer">
        <span className="tokenName">
          {props.field === "input" ? token1 : token2}
        </span>
      </div>
    </div>
  );
};

export default CurrencyField;
