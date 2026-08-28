import { useState } from 'react';
import { simulateMobileSosAlert } from '../lib/api.js';
import {
  HomeIcon,
  AlertIcon,
  ShelterIcon,
  BookIcon,
  ListIcon,
  MenuIcon,
  CloseIcon,
  ShieldIcon,
} from './icons.jsx';
import './Navbar.css';

const NAV_ITEMS = [
  { page: 'home', label: 'Home', Icon: HomeIcon },
  { page: 'alerts', label: 'Alerts', Icon: AlertIcon },
  { page: 'shelters', label: 'Shelters', Icon: ShelterIcon },
  { page: 'safety-guide', label: 'Safety Guide', Icon: BookIcon },
  { page: 'my-requests', label: 'My Requests', Icon: ListIcon },
];

export default function Navbar({ currentPage, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNav(page) {
    navigate(page);
    setMenuOpen(false);
  }

  return (
    <nav className="cp-navbar" role="navigation" aria-label="Main navigation">
      <div className="cp-navbar-inner">
        {/* Brand */}
        <button
          className="cp-navbar-brand"
          onClick={() => handleNav('home')}
          aria-label="Go to home"
        >
          <span className="cp-navbar-logo">
            <ShieldIcon size={22} />
          </span>
          <span className="cp-navbar-name">
            SANJEEVANI MESH <span className="cp-navbar-sub">Citizen Portal</span>
          </span>
        </button>

        {/* Desktop nav links */}
        <ul className="cp-navbar-links" role="list">
          {NAV_ITEMS.map(({ page, label, Icon }) => (
            <li key={page}>
              <button
                className={`cp-nav-link ${currentPage === page ? 'active' : ''}`}
                onClick={() => handleNav(page)}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                <Icon size={16} />
                {label}
              </button>
            </li>
          ))}
          <li>
            <button
              className="cp-btn cp-btn-danger cp-btn-sm"
              style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '16px' }}
              onClick={() => simulateMobileSosAlert()}
              title="Test receiving mobile SOS alert"
            >
              📲 Test Mobile SOS
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="cp-navbar-menu-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="cp-navbar-mobile" role="dialog" aria-label="Mobile navigation">
          <ul role="list">
            {NAV_ITEMS.map(({ page, label, Icon }) => (
              <li key={page}>
                <button
                  className={`cp-mobile-link ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handleNav(page)}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  <Icon size={18} />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
