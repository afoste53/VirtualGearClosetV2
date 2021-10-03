import { useContext } from "react";
import { Col, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../Utils/UserContext";

const HeaderComponent = () => {
  let { user } = useContext(UserContext);

  return (
    <Navbar className="bg-navy" variant="dark" expand="sm">
      <Col className="d-flex mx-2 p-3">
        <LinkContainer to="/">
          <Navbar.Brand>
            <span className="h3 text-cream">
              {user?.firstName}'s Virtual Gear Closet
            </span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {user?.firstName && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="h5 text-cream" to="/">
                Home
              </Nav.Link>
              <Nav.Link className="h5 text-cream" href="/">
                Link
              </Nav.Link>
              <NavDropdown
                className="h5 me-5 text-cream"
                title="Profile"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  something
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        )}
      </Col>
    </Navbar>
  );
};

export default HeaderComponent;
