/* eslint-disable @typescript-eslint/no-explicit-any */

import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex">
      <FormControl className="w-25" value={todo.title}
        onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value }))}/>
      <Button onClick={() => dispatch(addTodo(todo))}
              id="wd-add-todo-click"
               className="ms-1 btn-success flex-end"> Add </Button>
      <Button onClick={() => dispatch(updateTodo(todo))}
              id="wd-update-todo-click"
              className="ms-1 btn-warning"> Update </Button>
    </ListGroupItem>
);}
