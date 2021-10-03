import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Utils/UserContext";
import ToolbarComponent from "../components/ToolbarComponent";
import ToolbarButton from "../components/ToolbarButton";
import MainScreenComponent from "../components/MainScreenComponent";
import { Col } from "react-bootstrap";
import instance from "../Utils/AxiosInstance";

const HomeScreen = ({ history }) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user?.firstName) {
      history.push("/login");
    }
  }, [history, user]);

  const [showToolBar, setShowToolbar] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Col
      className={
        showToolBar ? "homescreen toolbar-show" : "homescreen toolbar-hidden"
      }
    >
      {showToolBar && (
        <ToolbarComponent loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      )}
      <ToolbarButton
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setShow={setShowToolbar}
        show={showToolBar}
      />
      <MainScreenComponent />
    </Col>
  );
};

export default HomeScreen;
