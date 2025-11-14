"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { redirect, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {FormLabel, FormControl, Badge, FormCheck, Form, Row, Col, Button} from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addAssignment, updateAssignment } from "../reducer";
import { useEffect } from "react";
import * as client from "../client";

export default function AssignmentEditor() {
  const {cid, aid} = useParams();
  const router = useRouter();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const assignment = assignments.find((a:any)=>a._id === aid);
  const isNew = aid === "new";
  console.log(aid);
  const [form, setForm] = useState(() => ({
        _id: assignment? assignment._id : uuidv4(),
        title: assignment? assignment.title : "",
        description: assignment? assignment.description : "",
        course: cid,
        due: assignment? assignment.due : "",
        available: assignment? assignment.available : "",
        points: assignment? assignment.points : "0"
  }))
  const dispatch = useDispatch();
  const onCreateAssignmentForCourse = async () => {
    if (!cid) return;
    const assignment = await client.createAssignmentForCourse(cid as string, form);
  };

  const onUpdateAssignment = async () => {
    if (!cid) return;
    const assignment = await client.updateAssignment(form);
  };

    return (
      <div id="wd-assignments-editor" className="w-75">
        {(assignment || isNew) && (
          <div>
            <FormLabel htmlFor="wd-name">Assignment Name</FormLabel><br></br>
            <FormControl onChange={(e)=>setForm({...form, title: e.target.value})}
                         id="wd-name" className="mb-4" defaultValue={form.title} />
            <FormControl onChange={(e)=>setForm({...form, description: e.target.value})}
                         id="wd-description" className="mb-4" as="textarea" rows={13} defaultValue={form.description}/>
            <Form>
                <Row className="mb-3">
                    <Col md={4} className="d-flex justify-content-end align-items-center">
                      <FormLabel htmlFor="wd-points"> Points </FormLabel>
                    </Col>
                    <Col md={8}> 
                      <FormControl onChange={(e)=>setForm({...form, points: e.target.value})}
                                   id="wd-points" type="number" placeholder={String(form.points)} /> 
                    </Col>
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
                          <FormControl onChange={(e)=>setForm({...form, due: e.target.value})}
                                       id="wd-due-date" type="date" defaultValue={form.due}/>
                        </div>
                        <Row className="mb-3 d-flex">
                          <Col md={6}>
                            <FormLabel htmlFor="wd-available-from" className="fw-bold fs-6 mb-2">Avaliable from</FormLabel>
                            <FormControl onChange={(e)=>setForm({...form, available: e.target.value})}
                                         id="wd-available-from" type="date" defaultValue={form.available}/>
                          </Col>
                          <Col md={6}>
                            <FormLabel htmlFor="wd-available-until" className="fw-bold fs-6 mb-2">Until</FormLabel>
                            <FormControl id="wd-available-until" type="date" defaultValue={form.due}/>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                </Row>
              </Form>
              <br/><hr/>
              <Button onClick={()=>{
                                    //if (isNew){dispatch(addAssignment(form));}
                                    //else {dispatch(updateAssignment(form));}
                                    if (isNew){onCreateAssignmentForCourse()}
                                    else {onUpdateAssignment()};
                                    redirect(`/Courses/${cid}/Assignments`);}}
                      className="bg-danger float-end pd-3 rounded-1">
                Save
              </Button>
              <Link href={`/Courses/${cid}/Assignments`}>
                <Button className="me-1 bg-light text-dark float-end pd-3 rounded-1">
                  Cancel
                </Button>
              </Link>
          </div>
        )}
      </div>
  );}