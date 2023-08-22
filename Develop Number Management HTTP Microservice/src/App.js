// App.js

import { useState, useEffect } from 'react';

function App() {

  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    const response = await fetch('/api/numbers');
    const data = await response.json();
    setNumbers(data);
  }

  const addNumber = async (number) => {
    const response = await fetch('/api/numbers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({number})  
    });

    if (response.ok) {
      setNumbers([...numbers, number]); 
    }
  }

  const deleteNumber = async (number) => {
    await fetch(`/api/numbers/${number}`, {method: 'DELETE'});
    setNumbers(numbers.filter(n => n !== number));
  }

  return (
    <div>
      <h1>Numbers</h1>
      <button onClick={() => addNumber(123)}>Add Number</button>
      
      <ul>
        {numbers.map(number => (
          <li key={number}>
            {number}
            <button onClick={() => deleteNumber(number)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;