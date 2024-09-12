import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaUserCircle } from 'react-icons/fa';
import { useGetEmployeeProfileQuery } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import { useLazyLogoutQuery } from '../../redux/api/authApi';
import usaFlag from '../../assets/usa.svg';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Utilisé pour savoir quel lien est actif
  
  const { isLoading } = useGetEmployeeProfileQuery();
  const [logout] = useLazyLogoutQuery();
  const { user } = useSelector((state) => state.auth);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logoutHandler = () => {
    logout();
    navigate('/', { replace: true });

    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  // Fonction pour vérifier si une route est active
  const isActive = (path) => location.pathname === path;

  return (
    <header style={styles.header}>
      {/* Nom de l'entreprise */}
      <div style={styles.logo}>
        <h2>Soul Connection</h2>
      </div>

      {/* Menu de navigation */}
      <nav style={styles.nav}>
        <Link to="/dashboard" style={isActive('/dashboard') ? { ...styles.link, ...styles.activeLink } : styles.link}>
          Dashboard
        </Link>
        <Link to="/employees" style={isActive('/employees') ? { ...styles.link, ...styles.activeLink } : styles.link}>
          Coaches
        </Link>
        <Link to="/customers" style={isActive('/customers') ? { ...styles.link, ...styles.activeLink } : styles.link}>
          Customers
        </Link>
        <Link to="/tips" style={isActive('/tips') ? { ...styles.link, ...styles.activeLink } : styles.link}>
          Tips
        </Link>
        <Link to="/events" style={isActive('/events') ? { ...styles.link, ...styles.activeLink } : styles.link}>
          Events
        </Link>
        <Link to="/clothes" style={isActive('/clothes') ? { ...styles.link, ...styles.activeLink } : styles.link}>
        </Link>
      </nav>

      {/* Boutons à droite */}
      <div style={styles.buttons}>
        {/* Bouton de messagerie */}
        <button style={styles.button}>
          <FaEnvelope size={20} />
        </button>

        {/* Bouton avec image ronde */}
        <button style={styles.button}>
          <img src={usaFlag} alt="User" style={styles.roundImage} />
        </button>

        {/* Bouton de l'utilisateur avec menu déroulant */}
        <div style={styles.userMenu}>
          <button style={styles.button} onClick={toggleDropdown}>
            <FaUserCircle size={20} />
          </button>
          {showDropdown && (
            <div style={styles.dropdown}>
              <Link to="/profile" style={styles.dropdownLink}>Profile</Link>
              <Link className="btn ms-4" id="logout_btn" to="/" onClick={logoutHandler}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  nav: {
    display: 'flex',
    gap: '20px'
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
    padding: '10px 0',
    position: 'relative' // Nécessaire pour la barre bleue en dessous
  },
  activeLink: {
    color: '#007bff', // Couleur bleue pour le lien actif
    fontWeight: 'bold',
  },
  activeBar: {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '#007bff', // Barre bleue sous le lien actif
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none'
  },
  roundImage: {
    width: '30px',
    height: '30px',
    borderRadius: '50%'
  },
  userMenu: {
    position: 'relative'
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: '100%',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000
  },
  dropdownLink: {
    display: 'block',
    padding: '10px',
    textDecoration: 'none',
    color: '#333'
  }
};

export default Header;
