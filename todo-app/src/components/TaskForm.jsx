import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskForm.css';
import { toast } from 'react-toastify';

const TaskForm = ({ task = {}, onSubmit, actionText }) => {
    const [name, setName] = useState(task.name || '');
    const [status, setStatus] = useState(task.status || 'Not Started');
    const [priority, setPriority] = useState(task.priority || 'Low');
    const [dueDate, setDueDate] = useState(task.dueDate || '');
    const [comments, setComments] = useState(task.comments || '');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...task, name, status, priority, dueDate, comments });
        toast.success(`Task ${actionText.toLowerCase()} successfully!`);
        navigate('/');
    };

    return (
        <div className="task-form-container">
            <form onSubmit={handleSubmit}>
                <label>Task Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                </select>

                <label>Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />

                <label>Comments</label>
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows="4"
                ></textarea>

                <button type="submit">{actionText} Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
