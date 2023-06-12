import Display from "./components/display";
import Buttons from "./components/buttons";
import { useEffect, useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState({ result: input, input: 0 });
  const [decimal, setDecimal] = useState(false);
  console.log(input);

  const handleClick = (event) => {
    const val = event.target.value;
    if (val === ".") {
      if (decimal) return;
      setDecimal(true);
    }
    const value = input + event.target.value;
    setInput(value);
    setDisplay({ result: value, input: value });
  };

  return (
    <div id="calculator">
      <Display display={display} />
      <Buttons handleClick={handleClick} />
    </div>
  );
};

export default App;
