import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../GameCard/GameCard';
import BadgeImage from '../../assets/images/badge.svg';
import './Profil.css';

const Profile = () => {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);

  useEffect(() => {
    const fetchFavoriteGames = async () => {
      const favoriteGameIds = Object.keys(localStorage).filter((key) =>
        key.includes('favorite_')
      ).map((key) => localStorage.getItem(key));
      const favoriteGamesData = await Promise.all(favoriteGameIds.map((id) => fetchGameDetails(id)));
      setFavoriteGames(favoriteGamesData);
    };

    const fetchCompletedGames = async () => {
      const completedGameIds = Object.keys(localStorage).filter((key) =>
        key.includes('completed_')
      ).map((key) => localStorage.getItem(key));
      const completedGamesData = await Promise.all(completedGameIds.map((id) => fetchGameDetails(id)));
      setCompletedGames(completedGamesData);
    };

    fetchFavoriteGames();
    fetchCompletedGames();
  }, []);

  const fetchGameDetails = async (id) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
      return response.data;
    } catch (error) {
      console.log('Error fetching game details:', error);
    }
  };

  const completedGamesCount = completedGames.length;
  const hasBadge = completedGamesCount >= 10;

  return (
    <div className="app container">
      <h3 className="text-center m-5">Mes jeux favoris :</h3>
      <div className="game-card-container card-deck row justify-content-center">
        {favoriteGames.map((game) => (
          <div className="col-md-4 mt-5" key={game.id}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
      <h3 className="text-center m-5">
      {hasBadge && <img src={BadgeImage} alt="Badge +10 jeux" className='img-badge'/>}
      {hasBadge ? 'Ma liste de jeux terminés:' : 'Ma liste de jeux terminés :'}
      </h3>
      <div className="game-card-container card-deck row justify-content-center">
        {completedGames.map((game) => (
          <div className="col-md-4 mt-5" key={game.id}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
