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

  const noDisplay = display === 0;

  const handleClick = (event) => {
    let value = event.target.value;
    if (isActive || isNegative) {
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
        if (noDisplay) return;
        const clear = display.slice(0, -1);
        const clearLog = log.slice(0, -1);
        const last = display.slice(-1);
        setLog(clearLog);
        setDisplay(clear);
        if (last === ".") {
          setDecimal(false);
        }
        return;
      case "=":
        if (noDisplay) return;
        if (isActive) {
          const prevLog = log.slice(0, -1);
          setLog(solve(prevLog));
          setDisplay(solve(prevLog));
          setResult(true);
          setActive(false);
          return;
        }
        setDisplay(solve(log));
        setLog(solve(log));
        setResult(true);
        return;
      case "-":
        if (isNegative) return;
        if (isActive) {
          setDisplay("-");
          setLog(log + "-");
          setNegative(true);
          return;
        }
        if (isResult) setResult(false);
        setLog(log + operator);
        setActive(true);
        setDecimal(false);
        setDisplay(operator);
        return;
      default:
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
