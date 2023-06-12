import Display from "./components/display";
import Buttons from "./components/buttons";
import { useState } from "react";

const App = () => {
  const [display, setDisplay] = useState({ result: 0, input: 0 });
  return (
    <div id="calculator">
      <Display display={display} />
      <Buttons />
    </div>
  );
};

export default App;
