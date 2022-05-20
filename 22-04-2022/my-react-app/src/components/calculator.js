import { Fragment, useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClear = () => {
    setInput("");
  };

  const handleInputChange = (value) => {
    setInput(input + value);
  };

  const handleCalculation = () => {
    if (input.includes("√")) {
      setInput(Math.sqrt(Number(input.slice(1))));
    }
    setInput(eval(input));
  };

  return (
    <Fragment>
      <div className="container mt-4 text-center">
        <h3>Calculator</h3>
        <div className="form-group mt-4">
          <input className="form-control" value={input} readOnly></input>
        </div>
        <div className="form-group mt-4">
          <div>
            <button className="btn btn-primary p-3 me-4" onClick={handleClear}>
              <strong className="h2">C</strong>
            </button>
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">/</strong>
            </button>
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">*</strong>
            </button>
            <button
              className="btn btn-primary p-3"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">+</strong>
            </button>
          </div>
          <div className="mt-4">
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">7</strong>
            </button>
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">8</strong>
            </button>
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">9</strong>
            </button>
            <button
              className="btn btn-primary p-3"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">-</strong>
            </button>
          </div>
          <div className="mt-4">
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">4</strong>
            </button>
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">5</strong>
            </button>
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">6</strong>
            </button>
            <button
              className="btn btn-primary p-3"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">**</strong>
            </button>
          </div>
          <div className="mt-4">
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">1</strong>
            </button>
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">2</strong>
            </button>
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">3</strong>
            </button>
            <button
              className="btn btn-primary p-3"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">√</strong>
            </button>
          </div>
          <div className="mt-4">
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">.</strong>
            </button>
            <button
              className="btn btn-primary p-3 me-4"
              onClick={(event) => handleInputChange(event.target.innerText)}
            >
              <strong className="h2">0</strong>
            </button>
            <button className="btn btn-primary p-3" onClick={handleCalculation}>
              <strong className="h2">=</strong>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Calculator;
