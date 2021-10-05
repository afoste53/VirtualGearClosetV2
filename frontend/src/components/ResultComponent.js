import { Modal, Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Utils/UserContext";
import instance from "../Utils/AxiosInstance";

const ResultComponent = ({ item, closetId }) => {
  const { user, setUser } = useContext(UserContext);

  // handling modal behavior
  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    setShow(false);
  };

  // state for all the various fields the gear item might have
  const [itemToSave, setItemToSave] = useState(item);
  const [name, setName] = useState(item.name);
  const [weight, setWeight] = useState(item.weight);
  const [color, setColor] = useState(item.color);
  const [cost, setCost] = useState(item.cost);
  const [quantity, setQuantity] = useState(item.quantity);
  const [brand, setBrand] = useState(item.brand);

  const [save, setSave] = useState(false);

  const updateUser = () => {
    try {
      const data = {
        gear: itemToSave,
      };

      instance.put(`/closets/${closetId}/update`, data, {
        headers: {
          "Access-Control-Allow-Origin": "true",
          Authorization: `Bearer ${user.token}`,
        },
      });
    } catch (err) {}
  };

  useEffect(() => {
    async function callUpdate() {
      if (closetId == undefined) return;
      try {
        await updateUser();
      } catch (err) {}
    }
    callUpdate();
    setShow(false);
  }, [itemToSave]);

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "weight":
        setWeight(e.target.value);
        break;
      case "color":
        setColor(e.target.value);
        break;
      case "cost":
        setCost(e.target.value);
        break;
      case "quantity":
        setQuantity(e.target.value);
        break;
      case "brand":
        setBrand(e.target.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setItemToSave({
      ...itemToSave,
      name,
      weight,
      color,
      cost,
      quantity,
      brand,
    });
  }, [save]);

  const handleSave = (e) => {
    e.preventDefault();
    setSave(!save);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-light-blue">
          <Modal.Title>{name}</Modal.Title>
          <Button variant="light" onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body className="bg-cream">
          <Form>
            <ul className="list-unstyled">
              <li key="name">
                <Form.Group className="d-flex justify-content-center align-items-center">
                  <Form.Label>Name: </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </li>

              <li key="weight">
                <Form.Group className="d-flex justify-content-center align-items-center">
                  <Form.Label>Weight: </Form.Label>
                  <Form.Control
                    type="text"
                    name="weight"
                    value={weight}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </li>

              <li key="color">
                <Form.Group className="d-flex justify-content-center align-items-center">
                  <Form.Label>Color: </Form.Label>
                  <Form.Control
                    type="text"
                    name="color"
                    value={color}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </li>

              <li key="cost">
                <Form.Group className="d-flex justify-content-center align-items-center">
                  <Form.Label>Cost: </Form.Label>
                  <Form.Control
                    type="text"
                    name="cost"
                    value={cost}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </li>

              <li key="quantity">
                <Form.Group className="d-flex justify-content-center align-items-center">
                  <Form.Label>Quantity: </Form.Label>
                  <Form.Control
                    type="text"
                    name="quantity"
                    value={quantity}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </li>

              <li key="brand">
                <Form.Group className="d-flex justify-content-center align-items-center">
                  <Form.Label>Brand: </Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={brand}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </li>
            </ul>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                onClick={handleSave}
                className="btn gear-save-btn"
              >
                Save
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <li className="result" onClick={(e) => setShow(true)}>
        {item.name}
      </li>
    </>
  );
};

export default ResultComponent;
