import HelloRedux from "./HelloRedux/HelloRedux";
import CounterRedux from "./CounterRedux/CounterRedux";
import AddRedux from "./AddRedux/AddRedux";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
  return(
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux/>
      <CounterRedux/>
      <AddRedux/>
      <TodoList/>
    </div>
  );
};
