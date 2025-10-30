"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";
import { useParams } from "next/navigation";
import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem} from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import ModuldControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { FormControl } from "react-bootstrap";

export default function Modules() {
    const {cid} = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    
    return (
      <div>
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} 
        addModule={()=>{dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");}}/>
          <br/><br /><br /><br />
        <ListGroup className="rounded-0"id="wd-modules">
          {modules.filter((module:any)=>module.course === cid).map((module:any)=>(
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3"/>
                {/* show name if not editing*/}
                {!module.editing && module.name}
                {/* show input field if editing */}
                { module.editing && (
                  <FormControl className="w-50 d-inline-block"
                        onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            dispatch(updateModule({ ...module, editing: false }));
                          }
                        }}
                        defaultValue={module.name}/>
                )}
                <ModuldControlButtons moduleId={module._id}
                                    deleteModule={(moduleId) => {dispatch(deleteModule(moduleId));}}
                                    editModule={(moduleId) => dispatch(editModule(moduleId))}/>
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