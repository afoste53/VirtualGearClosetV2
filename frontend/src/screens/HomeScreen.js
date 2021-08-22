import { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

const HomeScreen = ({ history }) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.firstName) {
      history.push("/login");
    }
  }, [user]);

  return (
    <Container className="m-0">
      <h2>homescreen</h2>
    </Container>
  );
};

export default HomeScreen;
