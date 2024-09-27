import { useState } from 'react';

export const useTaskService = () => {
    const [tasks, setTasks] = useState([
        { id: 1, name: 'Task 1', status: 'In Progress', priority: 'High' },
        { id: 2, name: 'Task 2', status: 'Not Started', priority: 'Low' },
        { id: 3, name: 'Task 3', status: 'Completed', priority: 'Low' },
        { id: 4, name: 'Task 4', status: 'In Progress', priority: 'Normal' },
    ]);

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
    };

    const updateTask = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return { tasks, addTask, updateTask, deleteTask };
};
