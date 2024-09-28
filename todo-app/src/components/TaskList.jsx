import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TaskList.css';
import { toast } from 'react-toastify';

const TaskList = ({ tasks, deleteTask }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(5);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // Filter tasks based on search and filters
    const filteredTasks = tasks.filter((task) =>
        (task.name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') &&
        (task.status === statusFilter || statusFilter === '') &&
        (task.priority === priorityFilter || priorityFilter === '')
    );

    // Pagination logic
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedTasks(currentTasks.map(task => task.id));
        } else {
            setSelectedTasks([]);
        }
    };

    const toggleTaskSelect = (taskId) => {
        setSelectedTasks((prevSelected) =>
            prevSelected.includes(taskId) ? prevSelected.filter(id => id !== taskId) : [...prevSelected, taskId]
        );
    };

    const handleDeleteTask = (id) => {
        setTaskToDelete(id);
        setIsConfirmingDelete(true);
    };

    const handleDeleteSelected = () => {
        setIsConfirmingDelete(true);
    };

    const confirmDelete = () => {
        if (taskToDelete) {
            deleteTask(taskToDelete);
            toast.success('Task deleted!');
        } else {
            selectedTasks.forEach(id => deleteTask(id));
            toast.success('Selected tasks deleted!');
        }
        setTaskToDelete(null);
        setSelectedTasks([]);
        setIsConfirmingDelete(false);
    };

    const cancelDelete = () => {
        setTaskToDelete(null);
        setIsConfirmingDelete(false);
    };

    // Handle pagination controls
    const goToFirstPage = () => setCurrentPage(1);
    const goToLastPage = () => setCurrentPage(totalPages);
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="task-list-container">
            <div className="header">
                <h1>Tasks</h1>
                <Link to="/add-task" className="new-task-button">New Task</Link>
            </div>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by task name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-control">
                    <option value="">All Statuses</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="form-control">
                    <option value="">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="task-count">
                Total Tasks: {filteredTasks.length}
            </div>

            <table className="task-table table table-striped">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th>Task Name</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTasks.map(task => (
                        <tr key={task.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedTasks.includes(task.id)}
                                    onChange={() => toggleTaskSelect(task.id)}
                                />
                            </td>
                            <td>{task.name}</td>
                            <td>{task.status}</td>
                            <td>{task.priority}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.comments}</td>
                            <td>
                                <Link to={`/edit-task/${task.id}`} className="edit-button">Edit</Link>
                                <button onClick={() => handleDeleteTask(task.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={goToFirstPage} disabled={currentPage === 1}>
                    First
                </button>
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                {[...Array(totalPages).keys()].map(number => (
                    <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={currentPage === number + 1 ? 'active' : ''}
                    >
                        {number + 1}
                    </button>
                ))}
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
                <button onClick={goToLastPage} disabled={currentPage === totalPages}>
                    Last
                </button>
            </div>

            {selectedTasks.length > 0 && (
                <button onClick={handleDeleteSelected} className="delete-selected-button">
                    Delete Selected
                </button>
            )}

            <div className="footer">
                <p>Enzigma © 2024</p>
            </div>

            {isConfirmingDelete && (
                <div className="confirmation-dialog">
                    <h2>Delete</h2>
                    <p>Are you sure you want to delete this task?</p>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={cancelDelete}>No</button>
                </div>
            )}
        </div>
    );
};

export default TaskList;
