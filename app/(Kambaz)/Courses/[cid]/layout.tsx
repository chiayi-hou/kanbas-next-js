"use client";

import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
const { cid } = useParams();
 const { courses } = useSelector((state: any) => state.coursesReducer);
 const course = courses.find((course: any) => course._id === cid);
 const {userEnrollments} = useSelector((state:any)=>state.enrollmentReducer); 
 if (!userEnrollments.some((e:any)=>e.course===cid)){
    redirect(`/Dashboard`);
 } 
 const [show, setShow] = useState(true);
 return (
   <div id="wd-courses">
    <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" onClick={()=>{setShow(!show)}}/>
        <Breadcrumb course={course}/>
    </h2>
    <hr />
    <div className="d-flex">
      {show && <div className="d-none d-md-block">
                <CourseNavigation />
                </div>
      }
      <div className="flex-fill">
        {children}
      </div>
    </div>
   </div>
);}
