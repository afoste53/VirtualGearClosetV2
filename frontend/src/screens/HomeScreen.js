import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Utils/UserContext";
import { Button, ButtonToolbar, Col, Container, Row } from "react-bootstrap";
import ToolbarComponent from "../components/ToolbarComponent";
import ToolbarButton from "../components/ToolbarButton";
import MainScreenComponent from "../components/MainScreenComponent";

const HomeScreen = ({ history }) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.firstName) {
      history.push("/login");
    }
  }, [history, user]);

  const [showToolBar, setShowToolbar] = useState(false);

  return (
    <Col
      className={
        showToolBar ? "homescreen toolbar-show" : "homescreen toolbar-hidden"
      }
    >
      {showToolBar && <ToolbarComponent />}
      <ToolbarButton setShow={setShowToolbar} show={showToolBar} />
      <MainScreenComponent />
    </Col>
  );
};

export default HomeScreen;
