import AssignmentControl from "./AssignmentControl";
import { ListGroup, ListGroupItem} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";

export default function Assignments() {
    return (
      <div id="wd-assignments">
        <AssignmentControl/><br/><br/>
        <ListGroup className="rounded-0" id="wd-assignment-list">
          <ListGroupItem id="wd-assignments-title" className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between"> 
              <div>
                <BsGripVertical className="me-2 fs-3"/><GoTriangleDown  className="me-1 fs-3"/>
                ASSIGNMENTS
              </div>
              <div>
                <span className="me-2 py-2 px-3 rounded-pill border border-dark">40% of Total</span>
                <FaPlus className="fs-4 me-3" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>
            <ListGroup className="wd-assignments rounded-0">
              <ListGroupItem action href="/Courses/1234/Assignments/123" id="wd-assignment-list-item" className="wd-lesson p-3 ps-1">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center ms-1">
                    <div>
                      <BsGripVertical className="me-2 fs-3"/><LuNotebookPen className="me-2 fs-3 text-success"/>
                    </div>
                    <div className="ms-2">
                      <div className="assignment-title"><b>A1</b></div>
                      <div className="assignment-describtions">
                          <span className="text-danger">Multiple Modules</span> | <b>Not avaliable until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                      </div>
                    </div>
                  </div>
                  <AssignmentControlButtons/>
                </div>
              </ListGroupItem>
              <ListGroupItem action href="/Courses/1234/Assignments/234" id="wd-assignment-list-item" className="wd-lesson p-3 ps-1">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center ms-1">
                    <div>
                      <BsGripVertical className="me-2 fs-3"/><LuNotebookPen className="me-2 fs-3 text-success"/>
                    </div>
                    <div className="ms-2">
                      <div className="assignment-title"><b>A2</b></div>
                      <div className="assignment-describtions">
                          <span className="text-danger">Multiple Modules</span> | <b>Not avaliable until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
                      </div>
                    </div>
                  </div>
                  <AssignmentControlButtons/>
                </div>
              </ListGroupItem>
              <ListGroupItem action href="/Courses/1234/Assignments/345" id="wd-assignment-list-item" className="wd-lesson p-3 ps-1">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center ms-1">
                    <div>
                      <BsGripVertical className="me-2 fs-3"/><LuNotebookPen className="me-2 fs-3 text-success"/>
                    </div>
                    <div className="ms-2">
                      <div className="assignment-title"><b>A3</b></div>
                      <div className="assignment-describtions">
                          <span className="text-danger">Multiple Modules</span> | <b>Not avaliable until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
                      </div>
                    </div>
                  </div>
                  <AssignmentControlButtons/>
                </div>
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
          <ListGroupItem id="wd-assignments-title" className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between"> 
              <div>
                <BsGripVertical className="me-2 fs-3"/><GoTriangleDown  className="me-1 fs-3"/>
                Quizzes
              </div>
              <div>
                <span className="me-2 py-2 px-3 rounded-pill border border-dark">10% of Total</span>
                <FaPlus className="fs-4 me-3" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>
            <ListGroup className="wd-assignments rounded-0">
              <ListGroupItem action href="/Courses/1234/Quizzes/123" id="wd-assignment-list-item" className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3"/><LuNotebookPen className="me-2 fs-3 text-success"/>
                <b>Q1</b>
                <LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem action href="/Courses/1234/Quizzes/234" id="wd-assignment-list-item" className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3"/><LuNotebookPen className="me-2 fs-3 text-success"/>
                <b>Q2</b>
                <LessonControlButtons/>
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
          <ListGroupItem id="wd-assignments-title" className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between"> 
              <div>
                <BsGripVertical className="me-2 fs-3"/><GoTriangleDown  className="me-1 fs-3"/>
                Exams
              </div>
              <div>
                <span className="me-2 py-2 px-3 rounded-pill border border-dark">20% of Total</span>
                <FaPlus className="fs-4 me-3" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>
            <ListGroup className="wd-assignments rounded-0">
              <ListGroupItem action href="/Courses/1234/Exam/123" id="wd-assignment-list-item" className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3"/><LuNotebookPen className="me-2 fs-3 text-success"/>
                <b>Exam 1</b>
                <LessonControlButtons/>
              </ListGroupItem>
              <ListGroupItem action href="/Courses/1234/Exam/234" id="wd-assignment-list-item" className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3"/><LuNotebookPen className="me-2 fs-3 text-success"/>
                <b>Exam 2</b>
                <LessonControlButtons/>
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
          <ListGroupItem id="wd-assignments-title" className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between"> 
              <div>
                <BsGripVertical className="me-2 fs-3"/><GoTriangleDown  className="me-1 fs-3"/>
                Projects
              </div>
              <div>
                <span className="me-2 py-2 px-3 rounded-pill border border-dark">30% of Total</span>
                <FaPlus className="fs-4 me-3" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>
            <ListGroup className="wd-assignments rounded-0">
              <ListGroupItem action href="/Courses/1234/Project/234" id="wd-assignment-list-item" className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3"/><LuNotebookPen className="me-2 fs-3 text-success"/>
                <b>Project</b>
                <LessonControlButtons/>
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
  );}
  