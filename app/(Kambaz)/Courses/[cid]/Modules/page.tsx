"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "next/navigation";
import * as db from "../../../Database";
import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem} from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import ModuldControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
    const {cid} = useParams();
    const modules = db.modules;    
    return (
      <div>
        <ModulesControls/><br/><br /><br /><br />
        <ListGroup className="rounded-0"id="wd-modules">
          {modules.filter((module:any)=>module.course === cid).map((module:any)=>(
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3"/>{module.name}<ModuldControlButtons/>
              </div>
              {module.lessons && (
                 <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson:any)=>(
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-2">
                    <BsGripVertical className="me-2 fs-3"/>{lesson.name} <LessonControlButtons/>
                  </ListGroupItem>
                  ))}
                 </ListGroup>
              )}
          </ListGroupItem>
          ))}
        </ListGroup>
      </div>
  );}