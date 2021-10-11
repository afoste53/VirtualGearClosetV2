import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Utils/UserContext";
import { Container, Form } from "react-bootstrap";
import instance from "../Utils/AxiosInstance";
import ResultComponent from "./ResultComponent";

const GearSearchComponent = ({ loggedIn, setLoggedIn }) => {
  const { user, setUser } = useContext(UserContext);

  const [filter, setFilter] = useState("");

  const [selectedCloset, setSelectedCloset] = useState("All Gear");

  const handleSelectedClosetChange = (e) => {
    setSelectedCloset(e.target.value);
  };

  return (
    <Container className="p-3">
      {user?.closets.length > 1 && (
        <select
          className="form-select form-select-sm"
          id="toolbar-closet-select"
          onChange={handleSelectedClosetChange}
        >
          {user?.closets.map((c) => (
            <option value={c.name} key={c.closet_id}>
              {c.closetName}
            </option>
          ))}
        </select>
      )}
      <Form.Control
        size="small"
        placeholder="Search Your Gear..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul className="list-unstyled px-3 py-1 my-1 searchResults">
        {user.closets
          .find((c) => c.closetName === selectedCloset)
          .gearInCloset.filter((g) => g.name.toLowerCase().includes(filter))
          .map((g) => (
            <ResultComponent className="result" key={g.id} item={g} />
          ))}
      </ul>
    </Container>
  );
};

export default GearSearchComponent;
