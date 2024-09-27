import React from 'react';
import TaskForm from './TaskForm';

const AddTask = ({ addTask }) => {
    const handleAddTask = (task) => {
        addTask(task);
    };

    return <TaskForm onSubmit={handleAddTask} actionText="Add" />;
};

export default AddTask;


