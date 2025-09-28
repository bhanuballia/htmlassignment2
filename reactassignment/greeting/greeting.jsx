// src/App.jsx
// src/App.jsx
import React from 'react';
import Greeting from './Greeting';

function App() {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '50px' }}>
      <h2>Example with a name prop</h2>
      <Greeting name="Alice" />

      <br />

      <h2>Example with no name prop</h2>
      <Greeting />
    </div>
  );
}

export default App;

