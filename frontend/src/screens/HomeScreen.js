import { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import { Col, Container, Row } from "react-bootstrap";

const HomeScreen = ({ history }) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.firstName) {
      history.push("/login");
    }
  }, [user]);

  return (
    <Container>
      {/**user?.closets.length === 0 && (
        <Container className="py-2 mt-3" id="newUserDialog">
          <p className="d-flex justify-content-center h4 mb-3">
            New here? We can help you get started!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            assumenda blanditiis ducimus eius eum illum laudantium, maxime, nisi
            quo sit unde velit? Accusamus, ad alias animi enim et excepturi
            molestiae praesentium quaerat vel voluptas voluptatem.
          </p>
        </Container>
      )**/}
      <Row>
        <Col xs={12} md={6}>
          Closets
        </Col>
        <Col xs={6} md={4}>
          Closets
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
