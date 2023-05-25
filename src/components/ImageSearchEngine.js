import React, { useState } from 'react';
import axios from 'axios';
import './../App.css'

function ImageSearchEngine() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchImages();
  };

  const searchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=30`,
        {
          headers: {
            Authorization: 'YAE-Fw5ZfiRKfyij3ZbWGi7JX3iaVErT9uqFIWdLAJ8o',
          },
        }
      );

      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={handleInputChange}
          className='Text'
        />
        <button className='btn' type="submit">Search</button>
      </form>
      <div>
        {results.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSearchEngine;
