import React from 'react';
import checkIcon from '../assets/icons/check.png';
import deleteIcon from '../assets/icons/delete.png';
import editIcon from '../assets/icons/pencil.png';

function TaskItem({ title, description, completed, onDelete, onComplete, onEdit }) {
  return (
    <div className={`taskItem ${completed ? 'completed' : ''}`}>
      <div className="taskHeader">
        <div className="taskTitle">
          <h3>{title}</h3>
        </div>
        <div className="taskButtons">
          <button
            onClick={onComplete} // Ensure this calls the onComplete function
            style={{ backgroundColor: completed ? '#e0ffe0' : 'initial' }}
          >
            <img src={checkIcon} alt="Complete Task" />
          </button>
          <button onClick={onEdit}> {/* Ensure this calls the onEdit function */}
            <img src={editIcon} alt="Edit Task" />
          </button>
          <button onClick={onDelete}> {/* Ensure this calls the onDelete function */}
            <img src={deleteIcon} alt="Delete Task" />
          </button>
        </div>
      </div>
      <div className="taskDesc">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TaskItem;
