import Digits from "./Digits";
import Operators from "./Operators";

const Buttons = ({ handleClick, handleOperation }) => {
  return (
    <div id="buttons">
      <Digits handleClick={handleClick} />
      <Operators handleOperation={handleOperation} />
    </div>
  );
};
export default Buttons;
