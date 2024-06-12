import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

// Navigation bar 
function Navigation() {
   // Get the current location using react-router's useLocation hook
   const location = useLocation();

   // Define an array of paths where you want to hide the navigation bar
   const hideNavbarPaths = ['/'];
 
   // Check if the current path matches any path in hideNavbarPaths
   const isHidden = hideNavbarPaths.includes(location.pathname);
 
   // Render the navigation bar if it's not hidden
   if (isHidden) {
     return null;
   }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={ Link } to="/">Home</Nav.Link>
            <Nav.Link as={ Link } to="/users">Users</Nav.Link>
            <Nav.Link as={ Link } to="/profile">Profile</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
