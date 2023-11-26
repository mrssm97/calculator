import { useState } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(0);
  let firstRow = ["AC", "X²", "√X", "÷"];
  let secondRow = ["%", "1", "2", "x"];
  let thirdRow = ["3", "4", "5", "+"];
  let fourthRow = ["6", "7", "8", "-"];
  let fifthRow = ["9", "0", ".", "="];
  let binaryOperator = ["÷", "x", "+", "-"];
  let operationToOperator = { "÷": "/", x: "*", "+": "+", "-": "-" };

  let number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  function lastElement(value) {
    return value[value.length - 1];
  }
  function calculateResult(operand1, operator, operand2 = 0) {
    if (operator === "√X")
      return setResult((Math.sqrt(operand1).toFixed(2) * 100) / 100);
    else if (operator === "X²")
      return setResult((Math.pow(operand1, 2).toFixed(2) * 100) / 100);
    else if (operator === "%") return setResult(operand1 / 100);
    else {
      console.log("Calculating res");
      let res = ` ${operand1}${operationToOperator[operator]}${operand2}`;
      console.log(res);
      setResult(eval(res));
    }
  }

  function handleButton(e) {
    let { name } = e.target;
    if ((!isNaN(input) || input.length === 0) && !isNaN(name))
      setResult(Number(input.concat(name)));
    if (name === "AC") {
      setInput("");
      setResult(0);
    } else if (name === "√X" && input.length) {
      calculateResult(result, name);
      setInput((old) => "√".concat(old));
    } else if (name === "X²") {
      calculateResult(result, name);
      setInput((old) => old.concat("²"));
    } else if (name === "=" && input.length) {
      setInput(`${result}`);
    } else if (name === "%") {
      calculateResult(result, name);
      setInput((old) => old.concat("%"));
    } else if (
      number.includes(name) &&
      binaryOperator.includes(lastElement(input))
    ) {
      console.log("Calling calculatr");
      calculateResult(result, lastElement(input), name);
      setInput((old) => old.concat(name));
    } else setInput((old) => old.concat(name));
  }

  return (
    <>
      <div className="main">
        <div className="w-100 h-100 flex-center">
          <div className="media-query">
            <div className="input border-0 text-end bg-secondary">{input} </div>
            {[firstRow, secondRow, thirdRow, fourthRow, fifthRow].map(
              (row, index) => {
                return (
                  <div className="height-16 w-100 m-0 p-0 d-flex" key={index}>
                    {row.map((item, i) => {
                      return (
                        <div className="p-0 m-0 ratios" key={i}>
                          <button
                            name={item}
                            className={`btn button ${
                              item === row[row.length - 1] ? "orange" : "brown"
                            } w-100 h-100 fs-2 mx-1 mt-1 rounded-0 border-1 border-secondary`}
                            onClick={handleButton}
                          >
                            {item}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
}
