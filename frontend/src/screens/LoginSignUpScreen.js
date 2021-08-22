import { useContext, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import UserContext from "../UserContext";

const LoginSignUpScreen = ({ history }) => {
  const { user, setUser } = useContext(UserContext);

  const [hasAccount, setHasAccount] = useState(true);

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordRef = useRef(null);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "first":
        setFirst(e.target.value);
        break;
      case "last":
        setLast(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirm":
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleClose = (e) => {
    setFirst("");
    setLast("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPasswordError(false);
    setHasAccount(true);
  };

  const handleRegister = (e) => {
    if (password !== confirmPassword) {
      setShowPasswordError(true);
      passwordRef.current.focus();
      return;
    }
  };

  const handleLogin = (e) => {
    setUser({
      firstName: "John",
      lastName: "Doe",
    });
    history.push("/");
  };

  return (
    <>
      <Modal show={!hasAccount} onHide={handleClose} id="registerModal">
        <Modal.Header className="bg-light-blue">
          <Modal.Title>Sign Up</Modal.Title>
          <Button variant="light" onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="my-3">
              <Col>
                <Form.Control
                  name="first"
                  type="text"
                  placeholder="First Name"
                  value={first}
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Control
                  name="last"
                  type="text"
                  placeholder="Last Name"
                  value={last}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="my-3 px-2">
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleInputChange}
              />
            </Row>
            <Row className="my-3 px-2">
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                ref={passwordRef}
                onChange={handleInputChange}
              />
            </Row>
            <Row className={showPasswordError ? "px-2 mt-3" : "px-2 my-3"}>
              <Form.Control
                name="confirm"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleInputChange}
              />
            </Row>
            {showPasswordError && (
              <Row className="mb-1 mx-2 text-danger text-bold">
                <p className="has-text-danger">Passwords Must Match</p>
              </Row>
            )}
            <Row className="mx-5">
              <Button size="lg" variant="success" onClick={handleRegister}>
                Go!
              </Button>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      <Container className="my-3 d-flex">
        <Col md={6} className="d-flex align-items-center">
          <Container>
            <Row>
              <h1 className="text-info">Virtual Gear Closet</h1>
            </Row>
            <Row className="px-3">
              <h2 className="h5">Organize. Plan. Share.</h2>
            </Row>
          </Container>
        </Col>
        <Col className="my-5">
          <Card className="my-5 p-3 loginCard">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeHolder="Email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeHolder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Row className="d-flex align-content-center">
                  <Button size="lg" variant="success" onClick={handleLogin}>
                    Login
                  </Button>
                </Row>
              </Form>
            </Card.Body>
            <Card.Footer className="blankFooter">
              <Row className="d-flex align-content-center">
                <Button
                  size="lg"
                  variant="info"
                  onClick={(e) => setHasAccount(false)}
                >
                  Don't have an account?
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default LoginSignUpScreen;
