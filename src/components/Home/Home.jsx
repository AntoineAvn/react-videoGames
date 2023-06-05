import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../GameCard/GameCard';
import './Home.css';

const Home = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;

    axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${page}`)
      .then(response => {
        setGames(prevGames => [...prevGames, ...response.data.results]);
        setHasNextPage(response.data.next !== null);
      })
      .catch(error => {
        console.log('Error fetching games:', error);
      });
  }, [page]);

  useEffect(() => {
    // Apply sort filter to displayed games
    let sortedGames = [...games];

    if (sort === 'name') {
      sortedGames.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === '-name') {
      sortedGames.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === '-rating') {
      sortedGames.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'rating') {
      sortedGames.sort((a, b) => a.rating - b.rating);
    }

    setFilteredGames(sortedGames);
  }, [sort, games]);

  const loadMoreGames = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="app container">
      <h1 className="text-center m-5">Les jeux du moment :</h1>
      <div className="text-center mb-4">
        <label htmlFor="sort">Trier par :</label>
        <select id="sort" value={sort} onChange={handleSortChange}>
          <option value="">Aucun</option>
          <option value="name">A - Z</option>
          <option value="-name">Z - A</option>
          <option value="-rating">Meilleure note</option>
          <option value="rating">Moins bonne note</option>
        </select>
      </div>
      <div className="card-deck row justify-content-center">
        {filteredGames.map((game, index) => (
          <div className="col-md-4 mt-5" key={index}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
      {hasNextPage && (
        <div className="text-center mt-5">
          <button className="btn btn-primary btn-showMore" onClick={loadMoreGames}>
            Afficher plus
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
