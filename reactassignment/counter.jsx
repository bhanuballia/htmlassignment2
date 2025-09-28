// src/CounterApp.jsx
import { useState } from 'react';

function CounterApp() {
  // Use the useState hook to manage the counter's state.
  // `count` is the state variable, and `setCount` is the function to update it.
  const [count, setCount] = useState(0);

  // Event handler for the increment button.
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // Event handler for the decrement button.
  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '50px' }}>
      <h1>Simple Counter App</h1>

      {/* Display the current count */}
      <h2>Current Count: {count}</h2>

      {/* Conditionally render the warning message */}
      {count < 0 ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>Counter cannot be negative!</p>
      ) : null}

      {/* Buttons to increment and decrement */}
      <button onClick={handleIncrement} style={{ marginRight: '10px' }}>
        Increment
      </button>
      <button onClick={handleDecrement}>
        Decrement
      </button>
    </div>
  );
}

export default CounterApp;
