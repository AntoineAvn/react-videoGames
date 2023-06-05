import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../GameCard/GameCard';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const fetchSearchResults = async () => {
        try {
          const apiKey = import.meta.env.VITE_API_KEY;
          const response = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}`);
          setSearchResults(response.data.results);
        } catch (error) {
          console.log('Error fetching search results:', error);
        }
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="text-center m-5">Recherche de jeux</h1>
      <div className="text-center mb-4">
        <input className='search-input'
          type="text"
          placeholder="Rechercher un jeu"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="card-deck row justify-content-center">
        {searchResults.map((game, index) => (
          <div className="col-md-4 mt-5" key={index}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
