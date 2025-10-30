"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from "react-redux";
import React from 'react'
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";


export default function AssignmentModuleControler() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (!currentUser){
    return <div>Loading...</div>
  }
  const isFaculty = (currentUser.role==="FACULTY"? true:false);
  return (
    <div>         
        {isFaculty && <FaPlus className="fs-4" />}   
        <IoEllipsisVertical className="fs-4" />
    </div>
  )
}
