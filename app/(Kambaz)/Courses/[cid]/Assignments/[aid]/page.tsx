"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import AssignmentEditor from "./Editor";
import AssignmentInfo from "./AssignmentInfo";

export default async function Assignment() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
      if (!currentUser){
        return <div>Loading...</div>
      }
      const isFaculty = (currentUser.role==="FACULTY"? true:false);
    return (
      <div id="wd-assignment" className="ms-5">
        {isFaculty? <AssignmentEditor/> : <AssignmentInfo/>}
      </div>
  );}

  
  