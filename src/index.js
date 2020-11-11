import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];

const BUTTON = [
  { id: "btn-0", name: "all", pressed: true },
  { id: "btn-1", name: "Active", pressed: false },
  { id: "btn-2", name: "Complete", pressed: false }
]

ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} buttons={BUTTON} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
