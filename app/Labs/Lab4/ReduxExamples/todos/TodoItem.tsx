import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({todo}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id}>
      <span className="w-25">{todo.title}</span>
      <Button onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"
              className="ms-1 btn-danger flex-end"> Delete </Button>
      <Button onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"
              className="ms-1 flex-end"> Edit </Button>
      </ListGroupItem>
    
);}