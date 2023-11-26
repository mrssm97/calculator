import { useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  let result = useRef(0);
  const [operator, setOperator] = useState("+");
  const [operand2, setOperand2] = useState(0);
  const rows = {
    r1: ["AC", "C", "XY", "+/-"],
    r2: ["X²", "√X", "%", "÷"],
    r3: ["π", "1", "2", "x"],
    r4: ["3", "4", "5", "+"],
    r5: ["6", "7", "8", "-"],
    r6: ["9", "0", ".", "="],
  };
  let operationToOperator = {
    "÷": "/",
    x: "*",
    "+": "+",
    "-": "-",
    "+/-": "-",
  };

  function calculateResult(op1, oprt, op2 = 0) {
    console.log(op1, op2);
    if (oprt === "√X") {
      result.current = Math.sqrt(op1);
    } else if (oprt === "X²") result.current = Math.pow(op1, 2);
    else if (oprt === "XY") result.current = Math.pow(op1, op2);
    else if (oprt === "%") result.current = op1 / 100;
    else {
      var res = ` ${op1}${operationToOperator[oprt]}${op2}`;
      result.current = eval(res);
    }
    result.current = (result.current.toFixed(4) * 10000) / 10000;
  }

  function handleButton(e) {
    let { name } = e.target;
    if (
      (!isNaN(input) || input.length === 0) &&
      ([".", "+/-", "π"].includes(name) || !isNaN(name))
    ) {
      console.log("Result");
      let item;
      if (name === "π") {
        item =
          result.current === 0 ? Math.PI : Number(result.current) * Math.PI;
      } else if (name === "+/-") {
        item = input[0] === "-" ? input.slice(1) : "-".concat(input);
      } else if (name === ".") {
        item = input.length ? input.concat(name) : "0.";
      } else item = input.concat(name);
      result.current = item;
      name === "π" ? setInput((old) => old + "π") : setInput(item);
    } else if (!isNaN(name) || name === "." || name === "π") {
      console.log("Operand seted");
      name === "π"
        ? setOperand2((old) => (old === 0 ? Math.PI : Number(old) * Math.PI))
        : setOperand2((old) => old + name);
      setInput((old) => old.concat(name));
    } else if (name === "AC") {
      setInput("");
      result.current = 0;
      setOperand2(0);
      setOperator("+");
    } else if (name === "C") {
      if (!isNaN(input)) {
        let item = input.slice(0, input.length - 1);
        setInput(item);
        result.current = Number(item);
      } else if (!isNaN(input[input.length - 1])) {
        setOperand2((old) => old.slice(0, old.length - 1));
        setInput((old) => old.slice(0, old.length - 1));
      } else {
        setOperator("+");
        setInput((old) => old.slice(0, old.length - 1));
      }
    } else if (name === "=") {
      console.log("Equal called");
      calculateResult(Number(result.current), operator, Number(operand2));
      setInput(`${result.current}`);
      setOperand2(0);
      setOperator("+");
    } else {
      setOperator(name);
      let item = input.length
        ? name === "X²"
          ? input.concat("²")
          : name === "√X"
          ? "√".concat(input)
          : name === "XY"
          ? input.concat("^")
          : input.concat(name)
        : "Invalid input";

      setInput(item);
    }
  }
  return (
    <>
      <div className="main">
        <div className="w-100 h-100 flex-center">
          <div className="media-query">
            <div className="input border-0 text-end bg-secondary">
              {input.length ? input : "0"}
            </div>
            {[rows.r1, rows.r2, rows.r3, rows.r4, rows.r5, rows.r6].map(
              (row, index) => {
                return (
                  <div className="height-16 w-100 d-flex" key={index}>
                    {row.map((item, i) => {
                      return (
                        <div className="ratios" key={i}>
                          <button
                            name={item}
                            className={`btn button ${
                              item === row[row.length - 1] ? "orange" : "brown"
                            } w-100 h-100 fs-2 rounded-0 border-1 border-secondary`}
                            onClick={handleButton}
                          >
                            {item === "XY" ? (
                              <>
                                x<sup>y</sup>
                              </>
                            ) : (
                              item
                            )}
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
