import { useContext, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import UserContext from "../UserContext";

const Header = () => {
  let { user } = useContext(UserContext);

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        {user ? `${user.firstName}'s` : "Welcome to"} Virtual Gear Closet
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {user && (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Link</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default Header;
