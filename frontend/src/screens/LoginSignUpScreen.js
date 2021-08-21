import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
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
    <Container className="my-3">
      {hasAccount ? (
        <Container>
          <h2>Log in</h2>
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
            <Button>Login</Button>
          </Form>
        </Container>
      ) : (
        <Container>
          <h2>signup</h2>
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
        </Container>
      )}
      <Button onClick={(e) => setHasAccount(!hasAccount)}>
        {hasAccount ? "Need an account?" : "I already have an account"}
      </Button>
    </Container>
  );
};

export default LoginSignUpScreen;
