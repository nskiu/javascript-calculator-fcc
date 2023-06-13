const Display = ({ display, log }) => {
  return (
    <div id="screen">
      <div id="log">{log}</div>
      <div id="display">{display}</div>
    </div>
  );
};

export default Display;
