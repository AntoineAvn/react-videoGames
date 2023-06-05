import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './NavBar.css';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="banniere">
      <Link to="/" className="link-banniere">
        <div>
          <img src={logo} className="img_logo" alt="logo" />
          <h1 className="titre">GameShow</h1>
        </div>
      </Link>
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="burger-menu" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <Link to="/" className="btn-nav">
          <button className="btn">Home</button>
        </Link>
        <Link to="/search" className="btn-nav">
          <button className="btn">Recherche</button>
        </Link>
        <Link to="/profil" className="btn-nav">
          <button className="btn">Profil</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
