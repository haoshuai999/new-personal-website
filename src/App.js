import React from 'react';
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {
  const taskList = props.tasks.map(task => (
    <Todo 
      name={task.name} 
      completed={task.completed} 
      id={task.id}
      key={task.id}
     />
  ));

  const buttonList = props.buttons.map(btn => (
    <FilterButton 
      name = {btn.name}
      pressed = {btn.pressed}
      id = {btn.id}
      key = {btn.id}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form />
      <div className="filters btn-group stack-exception">
        {buttonList}
      </div>
      <h2 id="list-heading">
        3 tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
