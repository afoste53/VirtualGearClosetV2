import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { UserContext } from "../Utils/UserContext.js";
import instance from "../Utils/AxiosInstance";
import { withRouter } from "react-router";

const LoginSignUpScreen = ({ history, loggedIn, setLoggedIn }) => {
  const { user, setUser } = useContext(UserContext);

  const [hasAccount, setHasAccount] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordRef = useRef(null);
  const OGpasswordRef = useRef(null);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showEmptyFieldsError, setShowEmptyFieldsError] = useState(false);

  useEffect(() => {
    const userFromLS = JSON.parse(window.localStorage.getItem("user"));
    if (userFromLS) {
      setUser(userFromLS);
      history.push("/");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user));
  });

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "first":
        setFirstName(e.target.value);
        break;
      case "last":
        setLastName(e.target.value);
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
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPasswordError(false);
    setShowEmptyFieldsError(false);
    setHasAccount(true);
  };

  const handleRegister = async (e) => {
    if (password !== confirmPassword) {
      setShowPasswordError(true);
      passwordRef.current.focus();
      return;
    } else if (!password || !firstName || !lastName || !email) {
      setShowEmptyFieldsError(true);
    } else {
      const newUser = {
        email,
        firstName,
        lastName,
        password,
      };

      try {
        let res = await instance.post("/users", newUser, {
          headers: { "Access-Control-Allow-Origin": "true" },
        });

        login(res);
      } catch (err) {
        //handle error
        console.error(err);
      }
    }
  };

  const handleLogin = async (e) => {
    // call to backend with login details
    try {
      let res = await instance.post(
        "/users/login",
        { email, password },
        { headers: { "Access-Control-Allow-Origin": "true" } }
      );

      login(res);
    } catch (err) {
      if (err.response?.data) {
        setShowPasswordError(true);
        OGpasswordRef?.current?.focus();
      }
    }
  };

  const login = (response) => {
    setUser({
      _id: response.data._id,
      email: response.data.email,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      closets: response.data.closets,
      token: response.data.token,
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
                  value={firstName}
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Control
                  name="last"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
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
            {showEmptyFieldsError && (
              <Row className="mb-1 mx-2 text-danger text-bold">
                <p className="has-text-danger">All fields are required</p>
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
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={6} xl={7} className="d-flex align-items-center">
            <Container>
              <Row>
                <h1 className="text-info">Virtual Gear Closet</h1>
              </Row>
              <Row className="px-xl-3">
                <h2 className="h5">Organize. Plan. Share.</h2>
              </Row>
            </Container>
          </Col>
          <Col xs={12} lg={5} xl={4} className="my-5">
            <Card className="my-lg-5 p-3 loginCard">
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      ref={OGpasswordRef}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  {showPasswordError && hasAccount && (
                    <Row>
                      <p className="d-flex justify-content-center text-danger">
                        <strong>Invalid Credentials</strong>
                      </p>
                    </Row>
                  )}
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
        </Row>
      </Container>
    </>
  );
};

export default withRouter(LoginSignUpScreen);
