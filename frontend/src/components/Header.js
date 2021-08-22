import { useContext, useEffect } from "react";
import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import UserContext from "../UserContext";

const Header = () => {
  let { user } = useContext(UserContext);

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Col className="d-flex mx-2 p-3">
        <Navbar.Brand href="/">
          <span className="h3">{user.firstName}'s Virtual Gear Closet</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {user && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="h5" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="h5" href="/">
                Link
              </Nav.Link>
              <NavDropdown
                className="h5 me-5"
                title="Profile"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        )}
      </Col>
    </Navbar>
  );
};

export default Header;
