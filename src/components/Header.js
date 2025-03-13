import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';
import NavItem from './NavItem';
import '../styles/App.css';

const Header = () => {
  const { favorites } = useFavorites();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
      variant="dark"
      expand="lg"
      fixed="top"
      className={`header-dynamic ${isScrolled ? 'scrolled' : ''}`}
    >
      <Container fluid="xxl">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/imagenes/logo.png"
            alt="Logo Concesionario"
            className="brand-logo"
          />
          <div className="brand-text-container">
            <span className="brand-main">AUTO ELITE</span>
            <span className="brand-sub">Concesionario Premium</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav" className="justify-content-end">
          <Nav>
            <NavItem to="/" label="Catálogo" />
            <NavItem
              to="/favoritos"
              label={
                <>
                  Favoritos
                  <span className="badge bg-warning text-dark ms-2">
                    {favorites.length}
                  </span>
                </>
              }
            />
            <NavItem to="/estadisticas" label="Estadísticas" />
            <NavItem to="/contacto" label="Contacto" />
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;