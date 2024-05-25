import { useEffect, useState } from "react"
import "./App.css"
import axios from "axios"

function App() {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("INR")
  const [convertedAmt, setConvertedAmt] = useState(null)
  const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(() => {
    const getExchange = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        const res = await axios.get(url)
        // console.log(res);
        setExchangeRate(res.data.rates[toCurrency])
      }
      catch (error) {
        console.error("Error Occured While Fetching Exchange Rate", error);
      }
    }
    getExchange();
  }, [fromCurrency, toCurrency])

  useEffect(() => {
    if (exchangeRate !== null) {
        setConvertedAmt((amount*exchangeRate).toFixed(2))
    }
  }, [amount, exchangeRate])

  const handleAmtChange = (e) => {
    let value = parseFloat(e.target.value)
    setAmount(isNaN(value) ? "" : value)
  }

  function fromCurrencyChange(e) {
    setFromCurrency(e.target.value)
    // console.log(e.target.value);
  }

  function toCurrencyChange(e) {
    setToCurrency(e.target.value)
    // console.log(e.target.value);
  }
  return (
    <>
      <div className="currency">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Convertor</h1>
          <div className="input-container">
            <label htmlFor="amt" >Amount</label>
            <input type="number" id="amt"  value={amount} onChange={handleAmtChange}/>
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency" >From Currency</label>
            <select id="fromCurrency" value={fromCurrency} onChange={fromCurrencyChange}>
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
          <div className="input-container">
            <label htmlFor="toCurrency">To Currency</label>
            <select id="toCurrency" value={toCurrency} onChange={toCurrencyChange}>
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
          <div className="result">
            <p> {amount} {fromCurrency} is equal to {convertedAmt} {toCurrency}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
