import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './NavBar.css';

function NavBar(){
  return (
      <div className="banniere">
         <Link to="/" className='link-banniere'>
            <div>
                <img src={logo} className="img_logo" alt="logo" />
                <h1 className="titre">GameShow</h1>
            </div>
          </Link>
          <div>
              <Link to="/" className='btn-nav'><button className="btn">Home</button></Link>
              <Link to="/search" className='btn-nav'><button className="btn">Recherche</button></Link>
              <Link to="/profil" className='btn-nav'><button className="btn">Profil</button></Link>
          </div>
      </div>
  );
}

export default NavBar;