import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Utils/UserContext";
import { Container, Form } from "react-bootstrap";
import ResultComponent from "./ResultComponent";
import instance from "../Utils/AxiosInstance";

const GearSearchComponent = ({ loggedIn, setLoggedIn }) => {
  const { user, setUser } = useContext(UserContext);

  const [filter, setFilter] = useState("");

  const [closet, setCloset] = useState([]);

  useEffect(async () => {
    await fetchClosets();
  }, []);

  const fetchClosets = async () => {
    try {
      let c = await instance.get(`/closets/owner/${user._id}`, {
        headers: {
          "Access-Control-Allow-Origin": "true",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCloset(c);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container className="p-3">
      <Form.Control
        size="small"
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul className="list-unstyled px-3 py-1 my-1 searchResults">
        {closet.length > 0 &&
          closet.map((c) => <li key={c?._id}>{c?.name}</li>)}
      </ul>
    </Container>
  );
};

export default GearSearchComponent;
