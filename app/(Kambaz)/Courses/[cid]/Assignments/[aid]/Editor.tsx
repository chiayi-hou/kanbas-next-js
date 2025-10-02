import {FormLabel, FormControl, Badge, Dropdown, FormSelect, FormCheck, Form, InputGroup, Row, Col, Button} from "react-bootstrap";

export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor" className="w-50">
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel><br></br>
        <FormControl id="wd-name" className="mb-4" defaultValue="A1 - ENV + HTML" />
        <FormControl id="wd-description" className="mb-4" as="textarea" rows={13} defaultValue="The assignment is available online. 
          Submit a link to the landing page of your Web application running on Netlify.
          The landing page should include the following:"/>
        <Form>
            <Row className="mb-3">
                <Col md={4} className="d-flex justify-content-end align-items-center">
                  <FormLabel htmlFor="wd-points"> Points </FormLabel>
                </Col>
                <Col md={8}> <FormControl id="wd-points" type="number" placeholder="100" /> </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4} className="d-flex justify-content-end align-items-center">
                  <FormLabel htmlFor="wd-group">Assignment Group </FormLabel>
                </Col>
                <Col md={8}> 
                  <Form.Select id="wd-group">
                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                    <option value="QUIZ">QUIZ</option>
                    <option value="PROJECT">PROJECT</option>
                  </Form.Select>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4} className="d-flex justify-content-end align-items-center">
                  <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
                </Col>
                <Col md={8}> 
                  <Form.Select id="wd-display-grade-as">
                    <option value="Precentage">Precentage</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4} className="d-flex justify-content-end">
                  <FormLabel htmlFor="wd-submission-type" className="pt-4">Submission Type</FormLabel>
                </Col>
                <Col md={8}> 
                  <div className="border rounded p-3">
                    <Form.Select id="wd-submission-type">
                      <option value="Online">Online</option>
                      <option value="Other">Other</option>
                    </Form.Select><br/>

                    <fieldset>
                      <FormLabel as="legend" size="sm" className="fw-bold fs-6 mb-3"> Online Entry Options </FormLabel>
                      <div>
                          <FormCheck id="wd-text-entry" className="mb-3" label="Text Entry" name="checkEntry" />
                          <FormCheck id="wd-website-url" className="mb-3" label="Website URL" name="checkEntry" defaultChecked/>
                          <FormCheck id="wd-media-recordings" className="mb-3" label="Media Recordings" name="checkEntry" />
                          <FormCheck id="wd-student-annotation" className="mb-3" label="Student Annotation" name="checkEntry" />
                          <FormCheck id="wd-file-upload" className="mb-3" label="File Upload" name="checkEntry" />
                      </div>
                    </fieldset>
                  </div>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4} className="d-flex justify-content-end">
                  <FormLabel htmlFor="wd-assign-to" className="pt-3">Assign</FormLabel>
                </Col>
                <Col md={8}> 
                  <div className="border rounded p-3">
                    <div className="mb-3">
                      <FormLabel htmlFor="wd-assign-to" className="fw-bold fs-6 mb-2">Assign to</FormLabel>
                      <div className="border p-1 w-100 rounded">
                        <Badge bg="light" className="me-2 text-dark fs-6 fw-light ps-3">
                          Everyone{" "}
                          <Button
                            variant=""
                            value="everyone"
                            size="sm"
                            className="btn-close btn-close-dark ms-3"
                            aria-label="Remove"
                          />
                        </Badge>
                      </div>
                    </div>
                    <div className="mb-3">
                      <FormLabel htmlFor="wd-due-date" className="fw-bold fs-6 mb-2">Due</FormLabel>
                      <FormControl id="wd-due-date" type="datetime-local" defaultValue="2024-05-13T23:59:00"/>
                    </div>
                    <Row className="mb-3 d-flex">
                      <Col md={6}>
                        <FormLabel htmlFor="wd-available-from" className="fw-bold fs-6 mb-2">Avaliable from</FormLabel>
                        <FormControl id="wd-available-from" type="datetime-local" defaultValue="2024-05-06T23:59:00"/>
                      </Col>
                      <Col md={6}>
                        <FormLabel htmlFor="wd-available-until" className="fw-bold fs-6 mb-2">Until</FormLabel>
                        <FormControl id="wd-available-until" type="datetime-local" defaultValue="2024-05-20T23:59:00"/>
                      </Col>
                    </Row>
                  </div>
                </Col>
            </Row>
          </Form>
          <br/><hr/>
          <Button className="bg-danger float-end pd-3 rounded-1">
            Save
          </Button>
          <Button className="me-1 bg-light text-dark float-end pd-3 rounded-1">
            Cancel
          </Button>
      </div>
  );}