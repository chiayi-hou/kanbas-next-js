"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";


export default function CoursesPage() {
 const { cid } = useParams();
 const {userEnrollments} = useSelector((state:any)=>state.enrollmentReducer); 
 if (userEnrollments.some((e:any)=>e.course===cid)){
    redirect(`/Courses/${cid}/Home`);
 } else {
    redirect(`/Dashboard`);
 }
 
}