import { useContext, useEffect } from "react";
import UserContext from "../UserContext";

const HomeScreen = ({ history }) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.firstName) {
      history.push("/login");
    }
  }, [user]);

  return (
    <div>
      <h2>homescreen</h2>
    </div>
  );
};

export default HomeScreen;
