import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
        tags: '',
        subtasks: []
    });

    const [newSubtask, setNewSubtask] = useState('');

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'pending',
                priority: task.priority || 'medium',
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
                tags: task.tags ? task.tags.join(', ') : '',
                subtasks: task.subtasks || []
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.title.trim()) {
            alert('Title is required');
            return;
        }

        const taskData = {
            ...formData,
            tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
            dueDate: formData.dueDate || null
        };

        onSave(taskData);
    };

    const addSubtask = () => {
        if (newSubtask.trim()) {
            setFormData(prev => ({
                ...prev,
                subtasks: [...prev.subtasks, { title: newSubtask.trim(), completed: false }]
            }));
            setNewSubtask('');
        }
    };

    const removeSubtask = (index) => {
        setFormData(prev => ({
            ...prev,
            subtasks: prev.subtasks.filter((_, i) => i !== index)
        }));
    };

    const toggleSubtask = (index) => {
        setFormData(prev => ({
            ...prev,
            subtasks: prev.subtasks.map((subtask, i) => 
                i === index ? { ...subtask, completed: !subtask.completed } : subtask
            )
        }));
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{task ? 'Edit Task' : 'Add New Task'}</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter task title"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Enter task description"
                                />
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="priority" className="form-label">Priority</label>
                                    <select
                                        className="form-select"
                                        id="priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dueDate"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="tags" className="form-label">Tags</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tags"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="Enter tags separated by commas"
                                />
                                <div className="form-text">Separate tags with commas (e.g., work, urgent, personal)</div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Subtasks</label>
                                <div className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newSubtask}
                                        onChange={(e) => setNewSubtask(e.target.value)}
                                        placeholder="Add a subtask"
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
                                    />
                                    <button className="btn btn-outline-secondary" type="button" onClick={addSubtask}>Add</button>
                                </div>
                                {formData.subtasks.length > 0 && (
                                    <ul className="list-group">
                                        {formData.subtasks.map((subtask, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={subtask.completed}
                                                        onChange={() => toggleSubtask(index)}
                                                    />
                                                    <label className={`form-check-label ${subtask.completed ? 'text-decoration-line-through' : ''}`}>
                                                        {subtask.title}
                                                    </label>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeSubtask(index)}
                                                >
                                                    ×
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                            {task ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
