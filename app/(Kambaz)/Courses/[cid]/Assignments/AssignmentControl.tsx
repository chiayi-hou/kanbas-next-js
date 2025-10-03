import { Button, FormControl, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

export default function AssignmentControl() {
  return (
    <Row>
      <Col xs={12}>
        <div className="d-flex flex-wrap align-items-center">

          <div className="d-flex align-items-center flex-shrink-0 border" style={{ width: 360 }}>
            <CiSearch className="fs-4 me-2 ms-2" />
            <FormControl className="border-0" size="lg" placeholder="Search..." />
          </div>

          <div className="ms-auto"></div>

          <div className="d-flex flex-shrink-0">
            <Button className="me-2" variant="secondary" size="lg" id="wd-add-assignment-group-btn">
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Group
            </Button>
            <Button className="me-1" variant="danger" size="lg" id="wd-add-assignment-btn">
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Assignment
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}
