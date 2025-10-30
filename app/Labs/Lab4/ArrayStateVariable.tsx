/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ArrayStateVariable() {
  const { todos } = useSelector((state: any) => state.todosReducer);
 const [array, setArray] = useState([1, 2, 3, 4, 5]);
 const addElement = () => {
   setArray([...array, Math.floor(Math.random() * 100)]);
 };
const deleteElement = (index: number) => {
   setArray(array.filter((item, i) => i !== index));
 };
 return (
  <div id="wd-array-state-variables" className="p-1">
   <h2>Array State Variable</h2>
   <button onClick={addElement} className="btn btn-success m-1">Add Element</button>
   <ListGroup className="border-1 w-25 float">
    {array.map((item, index) => (
     <ListGroupItem key={index} className="fw-bold"> {item}
      <button onClick={() => deleteElement(index)} className="btn btn-danger ms-5 float-end">
       Delete</button>
     </ListGroupItem>))}
   </ListGroup><hr/>
   <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
   </div>);}