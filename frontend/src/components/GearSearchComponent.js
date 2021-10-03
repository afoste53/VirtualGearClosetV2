import { useContext, useState } from "react";
import { UserContext } from "../Utils/UserContext";
import { Container, Form } from "react-bootstrap";
import ResultComponent from "./ResultComponent";

const GearSearchComponent = () => {
  const { user, setUser } = useContext(UserContext);

  const [filter, setFilter] = useState("");

  const handleItemChange = (e) => {
    setUser();
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
        {/*{user?.closets[0].gear*/}
        {/*  .filter((g) => g.name.includes(filter))*/}
        {/*  .map((g) => (*/}
        {/*    <ResultComponent*/}
        {/*      key={g.name}*/}
        {/*      item={g}*/}
        {/*      handleItemChange={handleItemChange}*/}
        {/*      className="result"*/}
        {/*    />*/}
        {/*  ))}*/}
      </ul>
    </Container>
  );
};

export default GearSearchComponent;
