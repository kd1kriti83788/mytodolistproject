import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import { useTaskService } from './services/taskService';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
    const { tasks, addTask, updateTask, deleteTask } = useTaskService();

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<TaskList tasks={tasks} deleteTask={deleteTask} />} />
                    <Route path="/add-task" element={<AddTask addTask={addTask} />} />
                    <Route path="/edit-task/:id" element={<EditTask tasks={tasks} updateTask={updateTask} />} />
                </Routes>
            </div>
            <ToastContainer position="top-right" />
        </Router>
    );
};

export default App;
