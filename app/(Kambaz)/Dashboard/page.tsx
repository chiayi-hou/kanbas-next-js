"use client"; 
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as client from "../Courses/client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import Link from "next/link";
import {Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { FormControl } from "react-bootstrap";
import { setUserEnrollments, addEnrollments, deleteEnrollment } from "./reducer";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });
  const [allCourses, setAllCourses] = useState<any>([]);

  // deal with courses
  const fetchAllCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      setAllCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
      //const all_courses = client.fetchAllCourses();
      //setAllCourses(all_courses);
    } catch (error) {
      console.error(error);
    }
  };
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
  };
  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course: any) => course._id !== courseId)));
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })));};

  // deal with enrollment
  const onAddEnrollment = async (userId:string, courseId: string, course:any) => {
    const newEnrollment = await client.addEnrollmentForUser(userId, courseId);
    dispatch(addNewCourse(course))
    //dispatch(addEnrollments(newEnrollment));
  }
  const onDeleteEnrollment = async (userId:string, courseID: string) => {
    await client.unEnrollForUser(userId, courseID);
    dispatch(deleteCourse(courseID))
    //dispatch(deleteEnrollment( courseID));
  }

  // on load
  useEffect(() => {
    fetchCourses();
    //fetchEnrollment();
  }, [currentUser]);


  const [enrollmentOnChange, setOnChange] = useState(false);
  //const {userEnrollments} = useSelector((state:any)=>state.enrollmentReducer);  
  // console.log(userEnrollments);

  if (!currentUser){
    return <div>Loading...</div>
  }
  const displayCourses = enrollmentOnChange ? allCourses : courses;  
  const isFaculty = (currentUser.role==="FACULTY"? true:false);
  
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {(isFaculty) && <div>
        <h5>New Course
        <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={() => {const newId = uuidv4();
                                setCourse({ ...course, _id: newId })
                                //const newCourse = { ...course, _id: newId };
                                onAddNewCourse();
                                //dispatch(addNewCourse(newCourse));
                               // dispatch(addEnrollments({_id:uuidv4(), user:currentUser._id, course: newId}))
                               }} > Add </button>
        <button className="btn btn-warning float-end me-2"
                  onClick={() => {onUpdateCourse()}} id="wd-update-course-click">Update </button>
          <br />
        <FormControl value={course.name} className="mb-2" 
                    onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
        <FormControl as="textarea" value={course.description} rows={3}
                    onChange={(e) => setCourse({ ...course, description: e.target.value }) }/>
        </h5><hr />
      </div>}

      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">Published Courses ({displayCourses.length})</h2>
       { (!isFaculty) &&
        <button className="btn btn-primary me-2"
                onClick={async () => {if (!enrollmentOnChange){await fetchAllCourses();}else{await fetchCourses()};
                setOnChange(!enrollmentOnChange)}} 
                id="wd-change-enrollment">{enrollmentOnChange? "My Courses":"All Courses"} </button>
       }
        </div>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
            {displayCourses.map(((display_course:any)=>{
                const enrolled = courses.some(
                  (c: any) => c._id === display_course._id
                );
                return (
                <Col key={display_course._id} className="wd-dashboard-course" style={{width: "300px"}}>
                <Card>
                    <Link href={enrolled? `/Courses/${display_course._id}/`:"/Dashboard"} className="wd-dashboard-course-link text-decoration-none text-dark">
                        <CardImg variant="top" src="/images/reactjs.jpg" alt="course image" width="100%" height={160}/>
                        <CardBody>
                            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">{display_course.name}</CardTitle>
                            <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                {display_course.description}
                            </CardText>
                            <Button variant="primary">Go</Button>

                            {(isFaculty && !(enrollmentOnChange)) && (<>
                                        <button onClick={(event) => {
                                              event.preventDefault();
                                              onDeleteCourse(display_course._id);
                                            }} 
                                              className="btn btn-danger float-end"
                                              id="wd-delete-course-click">
                                              Delete
                                      </button>
                                      <button id="wd-edit-course-click"
                                              onClick={(event) => {
                                                  event.preventDefault();
                                                  setCourse(display_course);
                                              }}
                                              className="btn btn-warning me-2 float-end" >
                                              Edit
                                      </button>
                                      </>
                              )}
                              {(enrollmentOnChange) && (
                                <>
                                <button onClick={(event) => {
                                              event.preventDefault();
                                              (enrolled? onDeleteEnrollment(currentUser._id, display_course._id):onAddEnrollment(currentUser._id, display_course._id, display_course));}} 
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
