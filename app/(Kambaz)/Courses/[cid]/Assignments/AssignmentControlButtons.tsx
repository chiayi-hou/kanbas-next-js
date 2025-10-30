import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import { useDispatch } from "react-redux";

export default function AssignmentControlButtons({assignmentID}:{assignmentID:string}) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    const confirmDelete = window.confirm("Delete Assignment?");

    if (confirmDelete){
      dispatch(deleteAssignment(assignmentID))
    }
  }
  
  return (
    <div>
      <FaTrash className="text-danger me-2 mb-1" onClick={handleDelete}/>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div> );}