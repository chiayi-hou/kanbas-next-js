"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function ModuldControlButtons(
  { moduleId, deleteModule, editModule }: { moduleId: string; deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void } 
) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (!currentUser){
    return <div>Loading...</div>
  }
  const isFaculty = (currentUser.role==="FACULTY"? true:false);
  return (
    <div className="float-end">
      { isFaculty && <>
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>
      <GreenCheckmark />
      <BsPlus  className="fs-4"/></>}
      <IoEllipsisVertical className="fs-4" />
    </div> )
  ;}