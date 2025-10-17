"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import Link from "next/link";
import {FormLabel, FormControl, Badge, FormCheck, Form, Row, Col, Button} from "react-bootstrap";

export default function AssignmentEditor() {
  const {cid, aid} = useParams();
  const assignments = db.assignments;
  const assignment = assignments.find((a:any)=>a._id === aid);
    return (
      <div id="wd-assignments-editor" className="w-75">
        {assignment && (
          <div>
            <FormLabel htmlFor="wd-name">Assignment Name</FormLabel><br></br>
            <FormControl id="wd-name" className="mb-4" defaultValue={assignment.title} />
            <FormControl id="wd-description" className="mb-4" as="textarea" rows={13} defaultValue={assignment.description}/>
            <Form>
                <Row className="mb-3">
                    <Col md={4} className="d-flex justify-content-end align-items-center">
                      <FormLabel htmlFor="wd-points"> Points </FormLabel>
                    </Col>
                    <Col md={8}> <FormControl id="wd-points" type="number" placeholder={String(assignment.points)} /> </Col>
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
                          <FormControl id="wd-due-date" type="date" defaultValue={assignment.due}/>
                        </div>
                        <Row className="mb-3 d-flex">
                          <Col md={6}>
                            <FormLabel htmlFor="wd-available-from" className="fw-bold fs-6 mb-2">Avaliable from</FormLabel>
                            <FormControl id="wd-available-from" type="date" defaultValue={assignment.available}/>
                          </Col>
                          <Col md={6}>
                            <FormLabel htmlFor="wd-available-until" className="fw-bold fs-6 mb-2">Until</FormLabel>
                            <FormControl id="wd-available-until" type="date" defaultValue={assignment.due}/>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                </Row>
              </Form>
              <br/><hr/>
              <Link href={`/Courses/${cid}/Assignments`}>
                <Button className="bg-danger float-end pd-3 rounded-1">
                  Save
                </Button>
              </Link>
              <Link href={`/Courses/${cid}/Assignments`}>
                <Button className="me-1 bg-light text-dark float-end pd-3 rounded-1">
                  Cancel
                </Button>
              </Link>
          </div>
        )}
      </div>
  );}