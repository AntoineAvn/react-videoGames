import React from 'react';
import { Link } from 'react-router-dom';
import xboxLogo from '../../assets/images/xboxLogo.svg';
import playstationLogo from '../../assets/images/playstationLogo.svg';
import nintendoLogo from '../../assets/images/nintendoLogo.svg';
import pcLogo from '../../assets/images/pcLogo.svg';
import macosLogo from '../../assets/images/macosLogo.svg';
import webLogo from '../../assets/images/webLogo.svg';
import './GameCard.css';

const getPlatformImages = (platforms) => {
  const platformNames = platforms.map((platform) => platform.platform.name.toLowerCase());
  const platformImages = new Set();

  const xboxRegex = /xbox/i;
  const playstationRegex = /playstation/i;
  const nintendoRegex = /nintendo/i;
  const pcRegex = /pc/i;
  const macosRegex = /apple/i;
  const web = /web/i;

  platformNames.forEach((name) => {
    if (xboxRegex.test(name)) {
      platformImages.add('xbox');
    }
    if (playstationRegex.test(name)) {
      platformImages.add('playstation');
    }
    if (nintendoRegex.test(name)) {
      platformImages.add('nintendo');
    }
    if (pcRegex.test(name)) {
      platformImages.add('pc');
    }
    if (macosRegex.test(name)) {
      platformImages.add('apple');
    }
    if (web.test(name)) {
      platformImages.add('web');
    }
  });

  return platformImages;
};

const getPlatformLogo = (platform) => {
  switch (platform) {
    case 'xbox':
      return xboxLogo;
    case 'playstation':
      return playstationLogo;
    case 'nintendo':
      return nintendoLogo;
    case 'pc':
      return pcLogo;
    case 'apple':
      return macosLogo;
    case 'web':
      return webLogo;
    default:
      return null;
  }
};

const GameCard = ({ game }) => {
  const platformImages = game.parent_platforms ? getPlatformImages(game.parent_platforms) : new Set();
  const logo = game.parent_platforms ? webLogo : getPlatformLogo('web');

  return (
    <div className="card">
      <Link to={`/game/${game.id}`}>
        <div className='card-image' data-content={`Date de sortie : ${game.released}, Note : ${game.rating}`}>
          <img
            src={game.background_image}
            className="card-img-top"
            alt={game.name}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        </div>
      </Link>
      <div className="card-body">
        <h5 className="card-title">{game.name}</h5>
        {game.parent_platforms && (
          <p className="card-text">
            {Array.from(platformImages).map((platform, index) => (
              <img
                key={index}
                src={getPlatformLogo(platform)}
                alt={platform}
                width="20"
                height="20"
                style={{ marginRight: '5px' }}
              />
            ))}
          </p>
        )}
        {!game.parent_platforms && (
          <p className="card-text">
            <img src={logo} alt="web" width="20" height="20" style={{ marginRight: '5px' }} />
          </p>
        )}
      </div>
    </div>
  );
};

export default GameCard;
