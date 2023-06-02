import React from 'react';
import xboxLogo from '../../assets/images/xboxLogo.svg';
import playstationLogo from '../../assets/images/playstationLogo.svg';
import nintendoLogo from '../../assets/images/nintendoLogo.svg';
import pcLogo from '../../assets/images/pcLogo.svg';
import macosLogo from '../../assets/images/macosLogo.svg';
import './GameCard.css';

const getPlatformImages = (platforms) => {
  const platformNames = platforms.map((platform) => platform.platform.name.toLowerCase());
  const platformImages = new Set();

  const xboxRegex = /xbox/i;
  const playstationRegex = /playstation/i;
  const nintendoRegex = /nintendo/i;
  const pcRegex = /pc/i;
  const macosRegex = /apple/i;

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
    default:
      return null;
  }
};

const GameCard = ({ game }) => {
  const platformImages = getPlatformImages(game.parent_platforms);
console.log(game);
  return (
    <div className="card">
        <div className='card-image' data-content={`Date de sortie : ${game.released}, Développeurs : ${game.developers}, Note : ${game.rating}`}>
            <img
            src={game.background_image}
            className="card-img-top"
            alt={game.name}
            style={{ height: '200px', objectFit: 'cover' }}/>
        </div>
      <div className="card-body">
        <h5 className="card-title">{game.name}</h5>
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
      </div>
    </div>
  );
};

export default GameCard;
