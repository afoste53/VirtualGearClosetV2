import { useContext, useEffect, useState } from "react";
import UserContext from "../Utils/UserContext";
import { Button, Col, Container, Row } from "react-bootstrap";
import ToolbarComponent from "../components/ToolbarComponent";

const HomeScreen = ({ history }) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user?.firstName) {
      history.push("/login");
    }
  }, [user]);

  const [showToolBar, setShowToolbar] = useState(false);

  return (
    <Row className={showToolBar ? "me-5" : "mx-5"}>
      {showToolBar && (
        <Col xs={4} lg={2}>
          <ToolbarComponent className="px-5" />
        </Col>
      )}
      <Col xs={1} className={!showToolBar && "ms-5"}>
        <Button
          variant="dark"
          className={showToolBar ? "toolbarButton rotated" : "toolbarButton"}
          onClick={(e) => setShowToolbar(!showToolBar)}
        >
          <i className="fas fa-bars" />
        </Button>
      </Col>
      <Col xs={7} lg={9}>
        <Container>closets</Container>
      </Col>
    </Row>
  );
};

export default HomeScreen;
