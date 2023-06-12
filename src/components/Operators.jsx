const Operators = () => {
  const operators = {
    clear: "AC",
    undo: "C",
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
          >
            {operators[btn]}
          </button>
        );
      })}
    </>
  );
};

export default Operators;
