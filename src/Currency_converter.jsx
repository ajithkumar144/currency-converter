import { useState } from "react";
import "./Currency_converter.css";
import currency_img from "./assets/currency.png";
import axios from "axios";

export const Currency_converter = () => {
  const [amount, setAmount] = useState("");
  const [fCurrency, setFCurrency] = useState("USD");
  const [tCurrency, setTCurrency] = useState("INR");
  const [warn_1, setWarn_1] = useState("");
  const [cAmount, setCAmount] = useState("");
  const [result, setResult] = useState(false);
  const [error, setError] = useState(false);
  const [errResponse, setErrorResponse] = useState("");
  const [loading, setLoading] = useState(false);

  function change(e) {
    setLoading(false);
    setResult(false);
    setError(false);
    setCAmount("");
    const value = e.target.value;

    if (!/^\d*\.?\d*$/.test(value)) {
      setWarn_1("Please enter valid number");
    } else {
      setWarn_1("");
    }
    setAmount(value);
  }


  function change_fCurrency(e) {
    setLoading(false);
    setResult(false);
    setError(false);
    setCAmount("");
    setFCurrency(e.target.value);
  }

  function change_TCurrency(e) {
    setLoading(false);
    setResult(false);
    setError(false);
    setCAmount("");
    setTCurrency(e.target.value);
  }

  async function convert() {
    const key ="a6956512382affc9c53e1bc0";
    const url = `https://v6.exchangerate-api.com/v6/${key}/latest/${fCurrency}`;

    if (amount === "") {
      setWarn_1("Please enter amount before convert");
      return;
    } else if (isNaN(amount)) {
      setWarn_1("Please enter number only..");
      setAmount("");
      return;
    }

    setWarn_1("");
    setLoading(true);

    try {
      const res = await axios.get(url);
      const rate = res.data.conversion_rates[tCurrency];
      const converted = (Number(amount) * rate).toFixed(2);
      setError(false)
      setCAmount(converted);
      setResult(true);
    } catch (err) {
      console.error(err);
      setResult(false)
      setError(true);
      if (err.response) {
        setErrorResponse(`Error ${err.response.status}: ${err.response.data?.error || "Failed to fetch rates"}`);
      } else {
        setErrorResponse("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="image">
        <img src={currency_img} alt="currency" />
      </div>

      <h2>Currency Converter</h2>
      <div>
        <div className="inp_amount">
          <label htmlFor="amount" id="one">Amount :</label>
          <p>{warn_1}</p>
          <input
            type="text"
            id="amount"
            placeholder="Enter amount"
            value={amount}
            onChange={change}
          />
        </div>

        <div className="from_currency">
          <label htmlFor="f_currency">From Currency :</label>
          <select id="f_currency" value={fCurrency} onChange={change_fCurrency}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>

        <div className="to_currency">
          <label htmlFor="t_currency">To Currency :</label>
          <select id="t_currency" value={tCurrency} onChange={change_TCurrency}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>

        <button onClick={convert}>Convert</button>
      </div>

      {(loading || result || error) && (
        <div className="result">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{errResponse}</p>}
          {result && (
            <p>
              "<span>{amount}</span>" {fCurrency} is equal to "<span>{cAmount}</span>" {tCurrency}
            </p>
          )}
        </div>
      )}
    </div>
  );
};









