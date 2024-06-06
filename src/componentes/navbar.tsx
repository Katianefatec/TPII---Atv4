import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Sistema Atlantis
        </Link>
      </div>
      <div id="navbarMenu" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/hospedes" className="navbar-item">
            Hóspedes
          </Link>
          <Link to="/acomodacoes" className="navbar-item">
            Acomodações
          </Link>
          <Link to="/hospedagens" className="navbar-item">
            Hospedagens
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

