import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const TaskContext = createContext();

// TaskProvider component that wraps around your app to provide task data
export const TaskProvider = ({ children }) => {
  // Initialize tasks from localStorage if available
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Counter for generating unique IDs
  const [nextId, setNextId] = useState(() => {
    const storedNextId = localStorage.getItem('nextId');
    return storedNextId ? parseInt(storedNextId, 10) : 1; // Default to 1 if not in localStorage
  });

  // Save tasks and nextId to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('nextId', nextId); // Save the nextId counter to localStorage
  }, [tasks, nextId]);

  // Add a new task with a unique ID
  const addTask = (title, description) => {
    const newTask = { id: nextId, title, description, completed: false }; // Use nextId as ID
    setTasks([...tasks, newTask]);
    setNextId(nextId + 1); // Increment the counter for the next task
  };

  // Delete a task by ID
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Toggle task completion status by ID
  const toggleCompleteTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Edit an existing task by ID
  const editTask = (id, updatedTitle, updatedDescription) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, title: updatedTitle, description: updatedDescription } : task
    );
    setTasks(updatedTasks);
  };



  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleCompleteTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};
