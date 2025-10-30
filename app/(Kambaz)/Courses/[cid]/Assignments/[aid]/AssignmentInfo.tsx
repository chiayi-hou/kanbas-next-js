"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function AssignmentInfo() {
  const {cid, aid} = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const assignment = assignments.find((a:any)=>a._id === aid);
  console.log(aid);
    return (
    <div>
        <h2>{assignment.title}</h2>
    </div>
    )
}