import React, { useState } from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return '#28a745';
            case 'in-progress':
                return '#ffc107';
            case 'pending':
                return '#6c757d';
            default:
                return '#6c757d';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return '#dc3545';
            case 'medium':
                return '#fd7e14';
            case 'low':
                return '#28a745';
            default:
                return '#6c757d';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No due date';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const isOverdue = (dueDate) => {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date() && task.status !== 'completed';
    };

    return (
        <div className={`card h-100 ${isOverdue(task.dueDate) ? 'border-danger' : ''}`}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{task.title}</h5>
                <div className="btn-group" role="group">
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setIsExpanded(!isExpanded)}
                        title="Toggle details"
                    >
                        {isExpanded ? '▲' : '▼'}
                    </button>
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onEdit(task)}
                        title="Edit task"
                    >
                        ✏️
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(task._id)}
                        title="Delete task"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            <div className="card-body">
                <div className="mb-2">
                    <span className={`badge me-2 ${task.status === 'completed' ? 'bg-success' : task.status === 'in-progress' ? 'bg-warning' : 'bg-secondary'}`}>
                        {task.status}
                    </span>
                    <span className={`badge me-2 ${task.priority === 'high' ? 'bg-danger' : task.priority === 'medium' ? 'bg-warning' : 'bg-success'}`}>
                        {task.priority}
                    </span>
                    {task.dueDate && (
                        <small className={`text-muted ${isOverdue(task.dueDate) ? 'text-danger' : ''}`}>
                            📅 {formatDate(task.dueDate)}
                        </small>
                    )}
                </div>

                {task.description && (
                    <p className="card-text">{task.description}</p>
                )}

                {isExpanded && (
                    <div className="mt-3">
                        {task.tags && task.tags.length > 0 && (
                            <div className="mb-2">
                                <strong>Tags:</strong>
                                {task.tags.map((tag, index) => (
                                    <span key={index} className="badge bg-light text-dark me-1">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {task.subtasks && task.subtasks.length > 0 && (
                            <div className="mb-2">
                                <strong>Subtasks:</strong>
                                <ul className="list-group list-group-flush">
                                    {task.subtasks.map((subtask, index) => (
                                        <li key={index} className="list-group-item d-flex align-items-center">
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-2"
                                                checked={subtask.completed}
                                                onChange={() => onStatusChange(task._id, index)}
                                            />
                                            <span className={subtask.completed ? 'text-decoration-line-through' : ''}>
                                                {subtask.title}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="text-muted small">
                            <div>Created: {new Date(task.createdAt).toLocaleDateString()}</div>
                            <div>Updated: {new Date(task.updatedAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="card-footer">
                <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task._id, 'status', e.target.value)}
                    className="form-select"
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
        </div>
    );
};

export default TaskCard;
