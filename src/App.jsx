import Display from "./components/display";
import Buttons from "./components/buttons";
import { useEffect, useState } from "react";

const App = () => {
  const [display, setDisplay] = useState({ log: "", output: 0 });
  const [input, setInput] = useState([]);
  const [operation, setOperation] = useState([]);
  const [isDecimal, setDecimal] = useState(false);
  const [isNegative, setNegative] = useState(false);
  console.log(input);

  const handleClick = (event) => {
    let value = event.target.value;
    const noInput = input.length === 0;
    if (value === ".") {
      if (isDecimal) return;
      if (noInput) value = "0.";
      setDecimal(true);
    }
    if (value === "0" && noInput) return;

    setInput(noInput ? [value] : [...input, value]);
  };

  const handleOperation = (event) => {
    const operator = event.target.value;
    switch (operator) {
      case "AC":
        reset();
        break;
      case "C":
        const undo = [...input].slice(0, -1);
        const last = [...input].slice(-1)[0];
        if (last === ".") setDecimal(false);

        setInput(undo);
        break;
      default:
        return;
    }
  };

  // change display
  useEffect(() => {
    const noInput = input.length === 0;
    const output = [input.join("")];
    setDisplay({ log: output, output: noInput ? 0 : output });
  }, [input]);

  function reset() {
    setDisplay({ log: "", output: 0 });
    setInput([]);
    setDecimal(false);
  }

  return (
    <div id="calculator">
      <Display display={display} />
      <Buttons handleClick={handleClick} handleOperation={handleOperation} />
    </div>
  );
};

export default App;

function calculate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return;
  }
}
