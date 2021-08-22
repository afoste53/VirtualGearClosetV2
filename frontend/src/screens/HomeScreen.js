import { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import Header from "../components/Header";

const HomeScreen = ({ history }) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.firstName) {
      history.push("/login");
    }
  }, [user]);

  return (
    <>
      <Header />
      <h2>homescreen</h2>
    </>
  );
};

export default HomeScreen;
