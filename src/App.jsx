import Display from "./components/display";
import Buttons from "./components/buttons";
import { useEffect, useState } from "react";

const App = () => {
  const [display, setDisplay] = useState(0);
  const [log, setLog] = useState("");
  const [isActive, setActive] = useState(false);
  const [isDecimal, setDecimal] = useState(false);
  const [isResult, setResult] = useState(false);
  const [isNegative, setNegative] = useState(false);
  const [equals, setEquals] = useState("");

  const noDisplay = display === 0 || display.length === 0 || display === "0";

  const handleClick = (event) => {
    let value = event.target.value;
    if (isActive || isNegative) {
      if (value === "0") {
        setDisplay(0);
        return;
      }
      setDisplay(value);
      setLog(log + value);
      setActive(false);
      setNegative(false);
      return;
    }

    if (value === ".") {
      if (isDecimal) return;
      if (noDisplay) {
        value = "0.";
      }
      setDecimal(true);
    }

    if (value === "0" && noDisplay) return;
    if (isResult) {
      setDisplay(value);
      setLog(value);
      setResult(false);
      return;
    }
    if (display === 0) {
      setDisplay(value);
    } else setDisplay(display + value);
    setLog(log + value);
  };

  const handleOperation = (event) => {
    const operator = event.target.value;
    switch (operator) {
      case "AC":
        setDisplay(0);
        setLog("");
        setDecimal(false);
        setActive(false);
        setResult(false);
        setNegative(false);
        return;
      case "C":
        if (noDisplay || isResult) return;

        if (log.length === 1) {
          setLog("");
          setDisplay(0);
          return;
        }
        const clear = display.slice(0, -1);
        const clearLog = log.slice(0, -1);
        const last = log.slice(-1);

        setLog(clearLog);
        if (clear === "") {
          setDisplay(clearLog);
        } else {
          setDisplay(clear);
        }
        if (last === ".") {
          setDecimal(false);
        }
        const operatorArr = ["+", "x", "/", "-"];
        const toActive = operatorArr.includes(log.slice(-2, -1));
        if (operatorArr.includes(last)) {
          if (last === "-" && toActive) {
            setNegative(false);
            return;
          }
          if (/\./g.test(log)) {
            setDecimal(!isDecimal);
            setActive(false);
          }
        }
        if (toActive) setActive(true);
        return;
      case "=":
        if (noDisplay || display[0] === "/" || display[0] === "x") return;
        if (isActive) {
          const prevLog = log.slice(0, -1);
          const calc = solve(prevLog);
          setLog(log + "=" + calc);
          setDisplay(calc);
          setResult(true);
          setActive(false);
          setEquals(calc);
          return;
        }
        const calc = solve(log);
        setLog(log + "=" + calc);
        setDisplay(calc);
        setResult(true);
        setEquals(calc);
        return;
      case "-":
        if (isNegative) return;
        if (isActive) {
          setDisplay("-");
          setLog(log + "-");
          setNegative(true);
          return;
        }
        if (isResult) {
          setLog(equals + operator);
          setDisplay(operator);
          setResult(false);
          setActive(true);
          return;
        }
        setLog(log + operator);
        setActive(true);
        setDecimal(false);
        setDisplay(operator);
        return;
      default:
        if (isResult) {
          setLog(equals + operator);
          setDisplay(operator);
          setResult(false);
          setActive(true);
          return;
        }
        if (isNegative) {
          const prevLog = log.slice(0, -2);
          setDisplay(operator);
          setLog(prevLog + operator);
          setNegative(false);
          return;
        }
        if (isResult) setResult(false);
        if (isActive) {
          const prevLog = log.slice(0, -1);
          setLog(prevLog + operator);
          setDisplay(operator);
          return;
        }
        setLog(log + operator);
        setActive(true);
        setDecimal(false);
        setDisplay(operator);
        return;
    }
  };

  function solve(equation) {
    let text = equation.replace(/x/g, "*");
    return eval(text);
  }

  return (
    <div id="calculator">
      <Display display={display} log={log} />
      <Buttons handleClick={handleClick} handleOperation={handleOperation} />
    </div>
  );
};

export default App;
