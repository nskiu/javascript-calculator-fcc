import Display from "./components/display";
import Buttons from "./components/buttons";
import { useEffect, useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [operation, setOperation] = useState("");
  const [display, setDisplay] = useState({ log: input, input: 0 });
  const [isDecimal, setDecimal] = useState(false);
  const [isNegative, setNegative] = useState(false);

  console.log(input);
  const handleClick = (event) => {
    let button = event.target.value;

    switch (button) {
      case ".":
        if (isDecimal) return;
        if (input.length === 0) button = "0.";
        setDecimal(true);
        break;
      case "0":
        if (input.length === 0) return;
        break;
    }

    const value = input + button;
    setInput(value);
    setDisplay({ log: display.log + button, input: value });
  };

  const handleOperation = (event) => {
    const value = event.target.value;
    switch (value) {
      case "AC":
        setInput("");
        setDisplay({ log: "", input: 0 });
        setDecimal(false);
        setNegative(false);
        break;
      case "C":
        if (input === "" || input === "0.") {
          setInput("");
          setDecimal(false);
          setDisplay({ log: "", input: 0 });
        } else {
          let undoInput = [...input];
          const log = [...display.log];
          const last = undoInput.pop();
          log.pop();
          if (last === ".") setDecimal(false);
          if (last === "-") setNegative(false);
          undoInput = undoInput.join("");
          setInput(undoInput);
          setDisplay({
            log: log,
            input: input.length === 1 ? 0 : undoInput,
          });
        }
        break;
      case "-":

      default:
        return;
    }
  };

  return (
    <div id="calculator">
      <Display display={display} />
      <Buttons handleClick={handleClick} handleOperation={handleOperation} />
    </div>
  );
};

export default App;
