"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import { useDispatch } from "react-redux";

export default function AssignmentControlButtons({assignmentID}:{assignmentID:string}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (!currentUser){
    return <div>Loading...</div>
  }
  const isFaculty = (currentUser.role==="FACULTY"? true:false);
  const handleDelete = () => {
    const confirmDelete = window.confirm("Delete Assignment?");

    if (confirmDelete){
      dispatch(deleteAssignment(assignmentID))
    }
  }
  
  return (
    <div>
      {isFaculty&&<>
      <FaTrash className="text-danger me-2 mb-1" onClick={handleDelete}/>
      <GreenCheckmark />
      </>}
      <IoEllipsisVertical className="fs-4" />
    </div> );}