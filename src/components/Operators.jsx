const Operators = ({ handleOperation }) => {
  const operators = {
    clear: "AC",
    undo: "CE",
    divide: "/",
    multiply: "x",
    subtract: "-",
    add: "+",
    equals: "=",
  };
  const buttons = Object.keys(operators);
  return (
    <>
      {buttons.map((btn) => {
        return (
          <button
            key={btn}
            className="operator"
            id={btn}
            value={operators[btn]}
            onClick={handleOperation}
          >
            {operators[btn]}
          </button>
        );
      })}
    </>
  );
};

export default Operators;
