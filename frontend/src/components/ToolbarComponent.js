import { Col, Container, Row } from "react-bootstrap";
import GearSearchComponent from "./GearSearchComponent";

const ToolbarComponent = () => {
  return (
    <Col className="toolbar bg-light-blue">
      <div>
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
