import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './GameDetail.css';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteIconRed, setIsFavoriteIconRed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;

    axios
      .get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
      .then((response) => {
        setGame(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log('Error fetching game:', error);
      });
  }, [id]);

  useEffect(() => {
    console.log(game);

    // Vérifier si le jeu est déjà ajouté aux favoris
    const isGameFavorite = localStorage.getItem(`favorite_${id}`);
    setIsFavorite(!!isGameFavorite);

    // Vérifier si le jeu est déjà marqué comme terminé
    const isGameCompleted = localStorage.getItem(`completed_${id}`);
    setIsCompleted(!!isGameCompleted);
  }, [game, id]);

  const toggleFavorite = () => {
    setIsFavorite((prevFavorite) => !prevFavorite);
    setIsFavoriteIconRed((prevIconRed) => !prevIconRed);

    if (!isFavorite) {
      localStorage.setItem(`favorite_${id}`, id);
    } else {
      localStorage.removeItem(`favorite_${id}`);
    }
  };

  const toggleCompleted = () => {
    if (isCompleted) {
      return; // Ne rien faire si le jeu est déjà marqué comme terminé
    }

    setIsCompleted(true);
    localStorage.setItem(`completed_${id}`, id);
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  const { name, rating, voteCount, description_raw, released, developers, genres, parent_platforms, background_image } = game;

  return (
    <div className='game-detail'>
      <div>
        <img src={background_image} alt={name} />
        <div className="title d-flex justify-content-between">
          <h2>{name}</h2>
          <p>Note : {rating} / 10 ({voteCount} votes)</p>
        </div>
      </div>
      <div>
        <h3>Synopsis :</h3>
        <p>{description_raw}</p>
      </div>
      <div className='d-flex justify-content-between'>
        <div className='w-50'>
          <p>Date de sortie : {released}</p>
          <p>Développeurs : {developers && developers.map(developer => developer.name).join(', ')}</p>
          <p>Genres : {genres && genres.map(genre => genre.name).join(', ')}</p>
          <p>Plateformes : {parent_platforms && parent_platforms.map(platform => platform.platform.name).join(', ')}</p>
        </div>
        <div>
          <label>
            <span className={`favorite-label ${isFavorite ? 'red' : ''}`} onClick={toggleFavorite}>
              {isFavorite ? 'Supprimer des favoris' : 'Ajouter aux favoris'}
              <FontAwesomeIcon icon={faHeart} className={`heart-icon ${isFavoriteIconRed ? 'red' : ''}`} />
            </span>
          </label>
        </div>
        <div>
          <label className="completed-label">
            <span className={isCompleted ? 'completed-text' : ''} onClick={toggleCompleted}>
              {isCompleted ? <del>Jeu terminé</del> : 'Ajouter à la liste des jeux terminés'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
