import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Utils/UserContext";
import { Container, Form } from "react-bootstrap";
import "../App.css";
import instance from "../Utils/AxiosInstance";

const GearSearchComponent = ({ loggedIn, setLoggedIn }) => {
  const { user, setUser } = useContext(UserContext);

  const [filter, setFilter] = useState("");

  const [closet, setCloset] = useState([]);
  const [allGear, setAllGear] = useState(<li>bananas</li>);

  useEffect(async () => {
    await fetchClosets();
  }, []);

  useEffect(() => {
    const ag = user?.closets.filter((c) => c.name === "All Gear")[0]?.gear;
    setAllGear(ag);
  }, [closet]);

  const fetchClosets = async () => {
    try {
      let c = await instance.get(`/closets/owner/${user._id}`, {
        headers: {
          "Access-Control-Allow-Origin": "true",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUser({ ...user, closets: c.data.closets });
      setCloset(c.data.closets);
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
        {allGear?.length > 0 &&
          allGear
            .filter((g) => g.name.toLowerCase().includes(filter))
            .map((g) => (
              <li className="results" key={g.id}>
                {g.name}
              </li>
            ))}
      </ul>
    </Container>
  );
};

export default GearSearchComponent;
