import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>Welcome to the Task Manager!</h2>
            <Link to="/add-task" className="btn btn-primary mr-2">Add a New Task</Link>
            <Link to="/task-list" className="btn btn-secondary">View Task List</Link>
        </div>
    );
};

export default Home;
