import React, { useState } from 'react';
import {pipeline}  from '@huggingface/transformers';

function App() {
  const [inputText, setInputText] = useState('');
  const [sentiment, setSentiment] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform sentiment analysis
    
    const classifier = await pipeline('sentiment-analysis');
    const result = await classifier(inputText);
    setSentiment(result[0].label);
  };

  return (
    <div>
      <h1>Sentiment Analysis</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Enter text:</label>
          <input
            type="text"
            id="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <button type="submit">Analyze</button>
      </form>
      {sentiment && (
        <div>
          <h2>Sentiment: {sentiment}</h2>
        </div>
      )}
    </div>
  );
}

export default App;