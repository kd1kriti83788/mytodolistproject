import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskForm.css';
import { toast } from 'react-toastify';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

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
        <Container className="task-form-container mt-5">
            <h3 className="text-center mb-4">{actionText} Task</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="taskName">
                    <Form.Label column sm={2}>Task Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Enter task name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="taskStatus">
                    <Form.Label column sm={2}>Status</Form.Label>
                    <Col sm={10}>
                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="taskPriority">
                    <Form.Label column sm={2}>Priority</Form.Label>
                    <Col sm={10}>
                        <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Normal">Normal</option>
                            <option value="High">High</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="dueDate">
                    <Form.Label column sm={2}>Due Date</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="comments">
                    <Form.Label column sm={2}>Comments</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <div className="text-center">
                    <Button type="submit" variant="primary" className="me-3">
                        {actionText} Task
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/')}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default TaskForm;
