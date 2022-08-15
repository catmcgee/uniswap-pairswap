import "./App.css";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import CurrencyField from "./components/CurrencyField";
import { getPrice } from "./logic/uniswapService";
import { ArrowDownUp } from "react-bootstrap-icons";
import PairButton from "./components/PairButton";
import "./App.css";

function App() {
  const [outputAmount, setOutputAmount] = useState(undefined);
  const [loading, setLoading] = useState(undefined);
  const [inputAmount, setInputAmount] = useState(undefined);
  const [pair, setPair] = useState(["USDC", "ETH"]);
  const [icon, setIcon] = useState([]);
  const [inverted, setInverted] = useState(false);

  const getSwapPrice = (inputAmount, pair, inverted) => {
    setLoading(true); // before receiving response, set to loading
    setInputAmount(inputAmount);

    getPrice(inputAmount, pair, inverted).then((data) => {
      setOutputAmount(data); // fill the second input field with response
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <div className="App">
            <div className="appNav">
              <PairButton
                pair={["USDC", "ETH"]}
                setPair={setPair}
                icon={[<img src="./icons/1.png" alt="USDCETH icon" key="1" />]}
                setIcon={setIcon}
              />
              <PairButton
                pair={["WBTC", "ETH"]}
                setPair={setPair}
                icon={[<img src="./icons/2.png" alt="WBTCETH icon" key="2" />]}
                setIcon={setIcon}
              />
              <PairButton
                pair={["UNI", "USDC"]}
                setPair={setPair}
                icon={[<img src="./icons/3.png" alt="UNIUSDC icon" key="3" />]}
                setIcon={setIcon}
              />
            </div>

            <div className="swapBody">
              <CurrencyField
                field="input"
                pair={pair}
                getSwapPrice={getSwapPrice}
                inverted={inverted}
              />
              <div className="invertIcon">
                <span onClick={() => setInverted(inverted ? false : true)}>
                  <ArrowDownUp size={40}></ArrowDownUp>
                </span>
              </div>
              <CurrencyField
                field="output"
                pair={pair}
                value={outputAmount}
                spinner={BeatLoader}
                loading={loading}
                inverted={inverted}
              />
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4" />
          <span className="screen__background__shape screen__background__shape3" />
          <span className="screen__background__shape screen__background__shape2" />
          <span className="screen__background__shape screen__background__shape1" />
        </div>
      </div>
    </div>
  );
}

export default App;
