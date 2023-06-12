const Display = ({ display }) => {
  return (
    <div id="screen">
      <div id="log">{display.log}</div>
      <div id="display">{display.input}</div>
    </div>
  );
};

export default Display;
