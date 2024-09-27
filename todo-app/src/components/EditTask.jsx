
import React from 'react';
import { useParams } from 'react-router-dom';
import TaskForm from './TaskForm';

const EditTask = ({ tasks, updateTask }) => {
    const { id } = useParams();
    const task = tasks.find(t => t.id === parseInt(id));

    const handleEditTask = (updatedTask) => {
        updateTask(updatedTask);
    };

    return task ? (
        <TaskForm task={task} onSubmit={handleEditTask} actionText="Update" />
    ) : (
        <div>Task not found</div>
    );
};

export default EditTask;
