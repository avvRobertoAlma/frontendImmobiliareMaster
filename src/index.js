import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";

import * as Web3 from "web3";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

const realEstateContractAbi = require("./utils/realEstateContractAbi.json");
const customerVerificationContractAbi = require("./utils/customerVerificationContractAbi.json");

const realEstateContractAddress = "0xA8aA17092E28475A81621d71EEbaa7A01fB21DD7";
const customerVerificationContractAddress =
  "0x9e0F8047609Fc28D730C54ff93f05c6F3bB94Edb";

window.web3 = new Web3(window.ethereum);
window.ethereum.enable();

window.realEstateContract = new window.web3.eth.Contract(
  realEstateContractAbi,
  realEstateContractAddress
);

window.customerVerificationContract = new window.web3.eth.Contract(
  customerVerificationContractAbi,
  customerVerificationContractAddress
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
