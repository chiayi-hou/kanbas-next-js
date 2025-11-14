"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as client from "../../client";

import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";
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

    const onCreateModuleForCourse = async () => {
      if (!cid) return;
      const newModule = { name: moduleName, course: cid };
      const  m = await client.createModuleForCourse(cid as string, newModule);
      dispatch(setModules([...modules, m]));
    };

    const onRemoveModule = async (moduleId: string) => {
      await client.deleteModule(moduleId);
      dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
    };

    const onUpdateModule = async (m: any) => {
      await client.updateModule(m);
      const newModules = modules.map((currentM: any) => currentM._id === m._id ? m : currentM );
      dispatch(setModules(newModules));
    };

    const fetchModules = async () => {
      const modules = await client.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
    };

    useEffect(() => {
      fetchModules();
    }, [cid]);

    return (
      <div>
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} 
        addModule={()=>{onCreateModuleForCourse();
          //dispatch(addModule({ name: moduleName, course: cid }));
          //setModuleName("");
          }}/>
          <br/><br /><br /><br />
        <ListGroup className="rounded-0"id="wd-modules">
          {modules.map((m:any)=>(
            <ListGroupItem key={m._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3"/>
                {/* show name if not editing*/}
                {!m.editing && m.name}
                {/* show input field if editing */}
                { m.editing && (
                  <FormControl className="w-50 d-inline-block"
                        onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                             onUpdateModule({ ...module, editing: false });
                          }
                        }}
                        defaultValue={m.name}/>
                )}
                <ModuldControlButtons moduleId={m._id}
                                    deleteModule={(moduleId) => {onRemoveModule(moduleId)}}
                                    editModule={(moduleId) => dispatch(editModule(moduleId))}/>
              </div>
              {m.lessons && (
                 <ListGroup className="wd-lessons rounded-0">
                  {m.lessons.map((lesson:any)=>(
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