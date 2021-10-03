import { Button, Col, Container, Row } from "react-bootstrap";
import GearSearchComponent from "./GearSearchComponent";

const ToolbarComponent = () => {
  const createNewCloset = (e) => {};

  const addGear = (e) => {};

  return (
    <Col className="toolbar bg-light-blue">
      <div>
        <div className="d-flex align-items-center justify-content-center">
          <button className="btn btn-sm toolbar-add-button" onClick={addGear}>
            <span>
              <i className="fas fa-plus" />
            </span>{" "}
            Add Gear
          </button>
          <button
            className="btn btn-sm toolbar-add-button bg-light-blue"
            onClick={createNewCloset}
          >
            <span>
              <i className="fas fa-plus" />
            </span>{" "}
            New Closet
          </button>
        </div>
        <Row>
          <GearSearchComponent />
        </Row>
        <Row>
          <div className="">things</div>
        </Row>
        <Row>
          <div className="">more things</div>
        </Row>
      </div>
    </Col>
  );
};

export default ToolbarComponent;
