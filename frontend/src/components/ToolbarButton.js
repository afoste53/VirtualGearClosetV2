import { Button, Col } from "react-bootstrap";

const ToolbarButton = ({ setShow, show }) => {
  const handleClick = (e) => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <Col
      className={show ? "bg-light-blue toolbarButtonCol" : "toolbarButtonCol"}
    >
      <Button onClick={handleClick}>
        <span>
          <i className="fas fa-bars" />
        </span>
      </Button>
    </Col>
  );
};

export default ToolbarButton;
