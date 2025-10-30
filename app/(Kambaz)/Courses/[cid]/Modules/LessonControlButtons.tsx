"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function LessonControlButtons() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (!currentUser){
    return <div>Loading...</div>
  }
  const isFaculty = (currentUser.role==="FACULTY"? true:false);
  return (
    <div className="float-end">
      {isFaculty && <GreenCheckmark />}
      <IoEllipsisVertical className="fs-4" />
    </div> );}