import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const NavItem = ({ to, label, badgeCount }) => {
  return (
    <Nav.Item className="nav-item-custom">
      <Nav.Link 
        as={Link} 
        to={to} 
        className="nav-link-custom position-relative"
      >
        {label}
        {badgeCount > 0 && (
          <span className="badge bg-warning text-dark ms-2">
            {badgeCount}
          </span>
        )}
      </Nav.Link>
    </Nav.Item>
  );
};

export default NavItem;