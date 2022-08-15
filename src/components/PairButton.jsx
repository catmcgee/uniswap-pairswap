import React from "react";
import { useState } from "react";

const PairButton = (props) => {
  const [active, setActive] = useState(undefined);

  const handleClick = () => {
    setActive(props.pair);
    props.setPair(props.pair);
  };

  return (
    <div className="top-btn">
      <button
        onClick={() => handleClick()}
        className={active === props.pair ? "activePairButton" : ""}
      >
        <b>
          {props.pair[0]} / {props.pair[1]}
        </b>
        {props.icon}
      </button>
    </div>
  );
};
export default PairButton;
