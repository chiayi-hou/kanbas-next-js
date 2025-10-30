"use client"; 
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import Link from "next/link";
import {Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { FormControl } from "react-bootstrap";
import { addEnrollments, deleteEnrollment } from "./reducer";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser == null) {
    return null; 
  }
  const isFaculty = (currentUser.role==="FACULTY"? true:false);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });
  const [enrollmentOnChange, setOnChange] = useState(false);
  const {userEnrollments} = useSelector((state:any)=>state.enrollmentReducer);  
   console.log(userEnrollments);
  const displayCourses = enrollmentOnChange ? courses : courses.filter((course: any)=>
                                                        userEnrollments.some((enrollment:any)=>enrollment.course===course._id));  
  
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {(isFaculty) && <div>
        <h5>New Course
        <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={() => dispatch(addNewCourse(course))} > Add </button>
        <button className="btn btn-warning float-end me-2"
                  onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">Update </button>
          <br />
        <FormControl defaultValue={course.name} className="mb-2" 
                    onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
        <FormControl as="textarea" defaultValue={course.description} rows={3}
                    onChange={(e) => setCourse({ ...course, description: e.target.value }) }/>
        </h5><hr />
      </div>}

      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">Published Courses ({displayCourses.length})</h2>
        {!isFaculty && <button className="btn btn-primary me-2"
                onClick={() => (setOnChange(!enrollmentOnChange))} id="wd-change-enrollment">{enrollmentOnChange? "My Courses":"All Courses"} </button>}   
        </div>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
            {displayCourses.map(((course:any)=>{
                const enrolled = userEnrollments.some(
                  (e: any) => e.course === course._id
                );
                return (
                <Col key={course._id} className="wd-dashboard-course" style={{width: "300px"}}>
                <Card>
                    <Link href={enrolled? `/Courses/${course._id}/`:"/Dashboard"} className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/reactjs.jpg" alt="course image" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{course.name}</CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                {course.description}
                            </CardText>
                            <Button variant="primary">Go</Button>

                            {isFaculty && (<>
                                        <button onClick={(event) => {
                                              event.preventDefault();
                                              dispatch(deleteCourse(course._id));}} 
                                              className="btn btn-danger float-end"
                                              id="wd-delete-course-click">
                                              Delete
                                      </button>
                                      <button id="wd-edit-course-click"
                                              onClick={(event) => {
                                                  event.preventDefault();
                                                  setCourse(course);
                                              }}
                                              className="btn btn-warning me-2 float-end" >
                                              Edit
                                      </button>
                                      </>
                              )}
                              {(!isFaculty&&enrollmentOnChange) && (
                                <>
                                <button onClick={(event) => {
                                              event.preventDefault();
                                              dispatch(enrolled? deleteEnrollment(course._id):addEnrollments({_id:uuidv4(), user:currentUser._id, course: course._id}));}} 
                                              className={`btn float-end ${enrolled? "btn-danger":"btn-success"}`}
                                              id="wd-unenroll-click">
                                              {enrolled? "Unenroll":"Enroll"}
                                  </button>
                                </>
                              )}
                        </CardBody>
                    </Link>
                </Card>
            </Col>)
            }))}
        </Row>
      </div>
    </div>
);}
