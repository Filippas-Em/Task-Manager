import React, { useState, useContext } from 'react';
import { TaskContext } from './TaskContext';
import TaskItem from './TaskItem';
import filterIcon from '../assets/icons/settings-sliders.png'; // Import the filter icon

function TaskList() {
  const { tasks, addTask, deleteTask, toggleCompleteTask, editTask } = useContext(TaskContext);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [newTitle, setNewTitle] = useState(''); // Task title input
  const [newDescription, setNewDescription] = useState(''); // Task description input
  const [isEditing, setIsEditing] = useState(false); // State to track if we're editing
  const [editingId, setEditingId] = useState(null); // The ID of the task being edited
  const [filter, setFilter] = useState('all'); // Task filter
  const [showFilters, setShowFilters] = useState(false); // Toggle filter options visibility

  // Handle form submission to add or edit a task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTitle && newDescription) {
      if (isEditing && editingId !== null) {
        editTask(editingId, newTitle, newDescription); // Edit existing task
      } else {
        addTask(newTitle, newDescription); // Add new task
      }
      resetForm(); // Clear form and hide it
    }
  };

  // Reset form fields and hide form
  const resetForm = () => {
    setNewTitle('');
    setNewDescription('');
    setShowForm(false);
    setIsEditing(false); // Exit editing mode
    setEditingId(null); // Clear editing ID
  };

  // Function to handle editing a task
  const handleEdit = (id) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      setNewTitle(task.title); // Preload task's title
      setNewDescription(task.description); // Preload task's description
      setEditingId(id); // Set which task is being edited
      setIsEditing(true); // Set editing mode to true
      setShowForm(true); // Show the form with preloaded data
    }
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'complete') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  // Function to get button styles based on the current filter
  const getButtonStyle = (buttonFilter) => ({
    backgroundColor: filter === buttonFilter ? '#3a86ff' : 'white',
    color: filter === buttonFilter ? 'white' : 'black',
  });

  return (
    <div className="Wrapper">
      <div className={`form ${showForm ? 'showForm' : ''}`}>
        {/* Task form to add or edit a task */}
        {showForm && (
          <form className="taskForm" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Task Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <textarea
              id="descInput"
              placeholder="Task Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              required
            />
            <button type="submit">{isEditing ? "Update" : "Add"}</button>
            <button type="button" onClick={resetForm}>Cancel</button> {/* Cancel button */}
          </form>
        )}
      </div>
      <div className={`taskList ${showForm ? 'showForm' : ''}`}>
        <div className="listWrapper">
          <div className="listOptions">
            <button
              id="filterToggle"
              onClick={() => setShowFilters(prev => !prev)}
            >
              <img src={filterIcon} alt="Filter Options" className="filterIcon" />
            </button>
            {showFilters && (
              <div className="filterOptions">
                <button
                  id="all"
                  style={getButtonStyle('all')}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button
                  id="complete"
                  style={getButtonStyle('complete')}
                  onClick={() => setFilter('complete')}
                >
                  Complete
                </button>
                <button
                  id="incomplete"
                  style={getButtonStyle('incomplete')}
                  onClick={() => setFilter('incomplete')}
                >
                  Incomplete
                </button>
              </div>
            )}
            <button
  id="addTask"
  onClick={() => {
    setShowForm(prev => !prev);
    if (!showForm) {
      setIsEditing(false); // Ensure it's not in edit mode when adding
      setNewTitle(''); // Clear form inputs
      setNewDescription(''); 
    }
  }}
>
  <span>+</span> <span id='addBtnTxt' style={{ fontSize: '15px' }}>{isEditing ? "Edit Task" : "Add a Task"}</span> 
</button>

          </div>
        </div>

        {/* Render filtered tasks */}
        <div className="tasks">
          {filteredTasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                id={task.id} // Pass the ID to TaskItem
                title={task.title}
                description={task.description}
                completed={task.completed}
                onDelete={() => deleteTask(task.id)}
                onComplete={() => toggleCompleteTask(task.id)}
                onEdit={() => handleEdit(task.id)} // Call handleEdit with task ID
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
