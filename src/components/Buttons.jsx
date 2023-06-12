import Digits from "./Digits";
import Operators from "./Operators";

const Buttons = ({ handleClick }) => {
  return (
    <div id="buttons">
      <Digits handleClick={handleClick} />
      <Operators />
    </div>
  );
};
export default Buttons;
