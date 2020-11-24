import React, { useEffect, useRef, useState } from 'react';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    function handleSave(e) {
      e.preventDefault();
      props.taskEdited(props.id, newName);
      setNewName("");
      setEditing(false);
    }

    function handleChange(e) {
      setNewName(e.target.value);
    }

    const editingTemplate = (
      <form className="stack-small">
        <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
            New name for {props.name}
          </label>
          <input 
            id={props.id} 
            className="todo-text" 
            type="text"
            value={newName}
            onChange={handleChange}
            ref={editFieldRef}
          />
        </div>
        <div className="btn-group">
          <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
            Cancel
            <span className="visually-hidden">renaming {props.name}</span>
          </button>
          <button type="submit" className="btn btn__primary todo-edit" onClick={handleSave}>
            Save
            <span className="visually-hidden">new name for {props.name}</span>
          </button>
        </div>
      </form>
    );
    const viewTemplate = (
      <div className="stack-small">
        <div className="c-cb">
            <input
              id={props.id}
              type="checkbox"
              defaultChecked={props.completed}
              onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <label className="todo-label" htmlFor={props.id}>
              {props.name}
            </label>
          </div>
          <div className="btn-group">
            <button
              type="button"
              className="btn"
              onClick={() => setEditing(true)}
              ref={editButtonRef}
            >
              Edit <span className="visually-hidden">{props.name}</span>
            </button>
            <button
              type="button"
              className="btn btn__danger"
              onClick={() => props.taskDeleted(props.id)}
            >
              Delete <span className="visually-hidden">{props.name}</span>
            </button>
          </div>
      </div>
    );
    
    useEffect(() => {
      if (isEditing && !wasEditing) {
        editFieldRef.current.focus()
      } 
      if (!isEditing && wasEditing) {
        editButtonRef.current.focus();
      }
    }, [isEditing]);

    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}