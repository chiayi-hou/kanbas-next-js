import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem} from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import ModuldControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
    return (
      <div>
        <ModulesControls/><br/><br /><br /><br />
        <ListGroup className="rounded-0"id="wd-modules">
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3"/> Week 1, Lecture 1 - Course Introduction, Syllabus <ModuldControlButtons/>
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-2 fs-3"/>LEARNING OBJECTIVES <LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="fs-3 me-5"/>Introduction to the course <LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Learn what is Web Development <LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-2 fs-3"/>READING<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Full Stack Developer - Chapter 1 - Introductior <LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Full Stack Developer - Chapter 2 -Creating User Interfaces With HTML<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-2 fs-3"/>SLIDES<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Introduction to Web Development <LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Creating an HTTP server with Node.js<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Creating a React Application<LessonControlButtons/>
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>

          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3"/>Week 2, Lecture 2 - Prototyping the React Kambaz User Interface with HTML<ModuldControlButtons/>
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-2 fs-3"/>LEARNING OBJECTIVES <LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Learn how to create user interfaces with HTML <LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Keep working on assignment 1<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Deploy the assignment to Netlify<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>READING<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Full Stack Developer - Chapter 1 - Building React User Interfaces with HTML<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-2 fs-3"/>SLIDES<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2"><BsGripVertical className="me-5 fs-3"/>Implementing the Kambaz Account Screens<LessonControlButtons/></ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2"><BsGripVertical className="me-5 fs-3"/>Implementing the Kambaz Dashboard Screens<LessonControlButtons/></ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2"><BsGripVertical className="me-5 fs-3"/>Implementing the Kambaz Courses Screens<LessonControlButtons/></ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2"><BsGripVertical className="me-5 fs-3"/>Implementing the Kambaz Modules Screens<LessonControlButtons/></ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2"><BsGripVertical className="me-5 fs-3"/>Implementing the Kambaz Assignments Screens<LessonControlButtons/></ListGroupItem>
            </ListGroup>
          </ListGroupItem>

          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3"/>Week 3<ModuldControlButtons/>
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-2 fs-3"/>LEARNING OBJECTIVES <LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Introduction to CSS <LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Selectors by tag ID, classes, and document structure<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Styling color and bcackground color<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-2 fs-3"/>READING<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-5 fs-3"/>Full Stack Developer - Chapter 2 -Styling Web Pages with CSS<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2">
                <BsGripVertical className="me-2 fs-3"/>SLIDES<LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2"><BsGripVertical className="me-5 fs-3"/>Introduction t o Cascading Style Sheets<LessonControlButtons/></ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2"><BsGripVertical className="me-5 fs-3"/>Styling with Colors<LessonControlButtons/></ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2"><BsGripVertical className="me-5 fs-3"/>The Box Model<LessonControlButtons/></ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2"><BsGripVertical className="me-5 fs-3"/>Size & Position<LessonControlButtons/></ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2"><BsGripVertical className="me-5 fs-3"/>Float<LessonControlButtons/></ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2"><BsGripVertical className="me-5 fs-3"/>Flex<LessonControlButtons/></ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-2"><BsGripVertical className="me-5 fs-3"/>Roating content & Gradient background<LessonControlButtons/></ListGroupItem>
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
  );}
  