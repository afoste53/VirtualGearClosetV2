import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

const ResultComponent = ({ item, handleItemChange }) => {
  const [show, setShow] = useState(false);

  const [gearKeys, setGearKeys] = useState(Object.keys(item));
  const [gearVals, setGearVals] = useState(Object.values(item));

  const handleClose = (e) => {
    setShow(false);
  };

  const handleInputChange = async (event) => {
    let t = gearVals;
    let i = gearKeys.indexOf(event.target.name);
    t[i] = event.target.value;
    await setGearVals(t);
  };

  /*   gear: [
      ==>  { name: "sleeping bag", color: "red", weight: 7 },
        { name: "tent", color: "red", weight: 7 },
        { name: "green tent", color: "green", weight: 7 },
        { name: "coat", color: "red", weight: 7 },
        { name: "pack", color: "red", weight: 7 },
        { name: "bike", color: "red", weight: 7 },
        { name: "slingshot", color: "red", weight: 7 },
        { name: "cooler", color: "red", weight: 7 },
    ],**/
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{item.name}</Modal.Title>
          <Button variant="light" onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-unstyled">
            {gearKeys.map((g, index) => (
              <li>
                <Form.Group>
                  <Form.Label>{g}</Form.Label>
                  <Form.Control
                    value={gearVals[index]}
                    name={g}
                    onChange={(event) => handleInputChange(event)}
                  />
                </Form.Group>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>

      <li className="result" onClick={(e) => setShow(true)}>
        {item.name}
      </li>
    </>
  );
};

export default ResultComponent;
