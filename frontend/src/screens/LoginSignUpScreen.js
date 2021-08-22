import { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import UserContext from "../UserContext";

const LoginSignUpScreen = () => {
  const { user, setUser } = useContext(UserContext);

  const [hasAccount, setHasAccount] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirm":
        setConfirmPassword(e.target.value);
        break;
    }
  };

  return (
    <Container className="my-3 d-flex">
      <Col md={7} className="d-flex align-content-center">
        <Container className="d-flex">
          <h1>Virtual Gear Closet</h1>
        </Container>
      </Col>
      {hasAccount ? (
        <Card md={5} className="mt-5 p-3 loginCard">
          <Card.Title>
            <h2>Log in</h2>
          </Card.Title>
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
                <Button size="lg" variant="success">
                  Login
                </Button>
              </Row>
            </Form>
          </Card.Body>
          <Card.Footer className="blankFooter">
            <Row className="d-flex align-content-center">
              <Button size="lg" onClick={(e) => setHasAccount(!hasAccount)}>
                Don't have an account?
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      ) : (
        <Card className="signUpCard mt-5 p-3">
          <Card.Title>
            <h2>signup</h2>
          </Card.Title>
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
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeHolder="Confirm Password"
                  name="confirm"
                  value={confirmPassword}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
            <Row className="d-flex align-content-center">
              <Button size="lg" variant="success">
                Login
              </Button>
            </Row>
          </Card.Body>
          <Card.Footer className="blankFooter">
            <Row size="lg" className="d-flex align-content-center">
              <Button onClick={(e) => setHasAccount(!hasAccount)}>
                "I already have an account"
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
};

export default LoginSignUpScreen;
