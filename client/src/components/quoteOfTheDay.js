import React, { useState, useEffect } from 'react';

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    fetch('http://localhost:3500/quoteoftheday')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setQuote(data.quote);
      })
      .catch(error => console.error('Error fetching quote:', error));
  }, []);

  return (
    <div>
      <div style={{fontFamily:"monospace", fontSize: "15px"}}>{quote.quote}</div>
      <div style={{fontFamily:"gaegu",display:"flex", justifyContent: "flex-end" , paddingRight: "20px"}}>- {quote.author}</div>
    </div>
  );
};

export default QuoteOfTheDay;