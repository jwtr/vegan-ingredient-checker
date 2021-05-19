import React, { useState } from 'react';
import * as isVegan from 'is-vegan';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [results, setResults] = useState({});
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');

  function checkVegan() {
    if (text === '') {
      setError('Please enter some ingredients!');
      return;
    }
    let ingredients = text.replaceAll(', ', ',').split(',');
    setResults(isVegan.checkIngredients(ingredients));
    setChecked(true);
    setError('');
  }

  return (
    <div className="App">
      <h1>Vegan Ingredient Checker</h1>
      <p>Enter a comma separated list of ingredients to check...</p>

      <input
        type="text"
        placeholder="Ingredients..."
        onChange={(event) => {
          setText(event.target.value.toLowerCase());
          setChecked(false);
        }}
      />
      <br />
      <button
        onClick={() => {
          checkVegan();
        }}
      >
        Check
      </button>

      {results && checked && results.nonvegan.length === 0 ? (
        <p>All ingredients are vegan!</p>
      ) : results && checked && results.nonvegan.length > 0 ? (
        <span>
          <p>Non-vegan ingredients:</p>
          <ul>
            {results.nonvegan.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </span>
      ) : null}

      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
