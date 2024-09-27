import { useState } from 'react';

export const useTaskService = () => {
    const [tasks, setTasks] = useState([
        { id: 1, assignedTo: 'User 1', status: 'In Progress', dueDate: '2024-09-25', priority: 'High', description: 'Task 1 Description' },
        { id: 2, assignedTo: 'User 2', status: 'Not Started', dueDate: '2024-09-26', priority: 'Low', description: 'Task 2 Description' },
        // You can add more sample tasks if needed
    ]);

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const updateTask = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return { tasks, addTask, updateTask, deleteTask };
};
