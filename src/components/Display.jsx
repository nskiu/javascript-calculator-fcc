const Display = ({ display }) => {
  return (
    <div id="display">
      <div id="result">{display.result}</div>
      <div id="input">{display.input}</div>
    </div>
  );
};

export default Display;
