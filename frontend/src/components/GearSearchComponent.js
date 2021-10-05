import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Utils/UserContext";
import { Container, Form } from "react-bootstrap";
import instance from "../Utils/AxiosInstance";
import ResultComponent from "./ResultComponent";

const GearSearchComponent = ({ loggedIn, setLoggedIn }) => {
  const { user, setUser } = useContext(UserContext);

  const [filter, setFilter] = useState("");

  const [closet, setCloset] = useState([]);
  const [closetToFilter, setClosetToFilter] = useState();

  const [selectedCloset, setSelectedCloset] = useState("All Gear");
  const [selectClosetId, setSelectClosetId] = useState(null);

  useEffect(async () => {
    await fetchClosets();
  }, []);

  useEffect(() => {
    const c = user?.closets.filter((c) => c.name == selectedCloset)[0]?.gear;
    setClosetToFilter(c);

    const cid = user?.closets
      .filter((c) => c.name === selectedCloset)
      .map((c) => c._id);
    setSelectClosetId(cid);
  }, [closet, selectedCloset]);

  const fetchClosets = async () => {
    try {
      if (!user?._id) return;
      let c = await instance.get(`/closets/owner/${user._id}`, {
        headers: {
          "Access-Control-Allow-Origin": "true",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUser({ ...user, closets: c.data.closets });
      setCloset(c.data.closets);
    } catch (err) {}
  };

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
          {user?.closets.map((c, i) => (
            <option value={c.name} key={c._id || i}>
              {c.name}
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
        {closetToFilter?.length > 0 &&
          closetToFilter
            .filter((g) => g.name.toLowerCase().includes(filter))
            .map((g) => (
              <ResultComponent
                className="result"
                key={g.id}
                item={g}
                closetId={selectClosetId}
              />
            ))}
      </ul>
    </Container>
  );
};

export default GearSearchComponent;
