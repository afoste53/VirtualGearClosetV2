import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import LoginSignUpScreen from "./screens/LoginSignUpScreen";
import { UserContext } from "./Utils/UserContext";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        {user && <HeaderComponent />}
        <div>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/login" component={LoginSignUpScreen} />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
