import React, { useState, useRef, useEffect } from 'react';
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const listHeadingRef = useRef(null);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function addNewTask(name) {
    const newTask = {id: "todo-" + nanoid(), name: name, completed: false};
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map(task => {
      if (id === task.id) {
        //
        return {...task, name: newName};
      }
      return task;
    })
    setTasks(editedTasks);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo 
      name={task.name} 
      completed={task.completed} 
      id={task.id}
      key={task.id}
      toggleTaskCompleted = {toggleTaskCompleted}
      taskDeleted = {deleteTask}
      taskEdited = {editTask}
     />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name}
      name={name}
      pressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // const buttonList = props.buttons.map(btn => (
  //   <FilterButton 
  //     name = {btn.name}
  //     pressed = {btn.pressed}
  //     id = {btn.id}
  //     key = {btn.id}
  //   />
  // ));

  const tasksNoun = taskList.length === 1 ? 'task' : 'tasks';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const prevTaskLength = usePrevious(tasks.length);
  
  // function alertMessage(name) {
  //   alert(name);
  // }
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form message = {addNewTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
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
