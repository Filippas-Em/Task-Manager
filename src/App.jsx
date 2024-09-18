import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList';
import { TaskProvider } from './components/TaskContext';

function App() {

  return (
    <>
      <TaskProvider>
        <div className="App">
          <TaskList />
        </div>
      </TaskProvider>
    </>
  )
}

export default App
