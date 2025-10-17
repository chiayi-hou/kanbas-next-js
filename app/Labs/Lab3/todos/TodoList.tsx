import TodoItem from "./TodoItem";
import todos from "./todos.json";
import { ListGroup } from "react-bootstrap";

{/* map(new_name => {things to do (like return...)}) */}
export default function TodoList() {
 return(
   <>
     <h3>Todo List</h3>
     <ListGroup>
       { todos.map(todo => {
           return(<TodoItem key={todo.title} todo={todo}/>);   })}
     </ListGroup><hr/>
   </>
);}
