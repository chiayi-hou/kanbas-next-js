import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

{/* TodoItem expect input and retun React compoment based on the input. 
    Things after todo = ___ are the default values */}
const TodoItem = ( { todo = { done: true, title: 'Buy milk',
                              status: 'COMPLETED' } }) => {
 return (
   <ListGroupItem>
     <input type="checkbox" className="me-2"
            defaultChecked={todo.done}/>
     {todo.title} ({todo.status})
   </ListGroupItem>
 );}
export default TodoItem;