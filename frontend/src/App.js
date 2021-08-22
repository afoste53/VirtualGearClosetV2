import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import LoginSignUpScreen from "./screens/LoginSignUpScreen";
import UserContext from "./UserContext";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Container>
          <Route path="/login" component={LoginSignUpScreen} />
          <Route exact path="/" component={HomeScreen} />
        </Container>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
