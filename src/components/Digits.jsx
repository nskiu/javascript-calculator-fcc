const Digits = ({ handleClick }) => {
  const digits = {
    zero: 0,
    decimal: ".",
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  const numbers = Object.keys(digits);
  return (
    <div id="digits">
      {numbers.map((num) => {
        return (
          <button
            key={num}
            className="digit"
            id={num}
            value={digits[num]}
            onClick={handleClick}
          >
            {digits[num]}
          </button>
        );
      })}
    </div>
  );
};

export default Digits;
