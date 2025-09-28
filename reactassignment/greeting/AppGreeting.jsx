// src/Greeting.jsx
import React from 'react';

// Use ES6 destructuring and a default value for the name prop
function Greeting({ name = "Guest" }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
}

export default Greeting;


