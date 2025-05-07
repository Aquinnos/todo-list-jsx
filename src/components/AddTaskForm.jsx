import React, { useState, useRef } from 'react';

const AddTaskForm = ({
  addTask,
  setIsSearchModalOpen,
  confirmDeleteAllTasks,
}) => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(1);
  const [taskNote, setTaskNote] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  const taskNameInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};

    if (!taskName.trim()) {
      newErrors.taskName = 'Task name is required';
    }

    if (priority < 1 || priority > 5) {
      newErrors.priority = 'Priority must be between 1 and 5';
    }

    if (
      dueDate &&
      new Date(dueDate) < new Date(new Date().setHours(0, 0, 0, 0))
    ) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setTaskName('');
    setPriority(1);
    setTaskNote('');
    setDueDate('');
    setErrors({});
  };

  const handleAddTask = () => {
    if (validateForm()) {
      const success = addTask(taskName, priority, taskNote, dueDate);
      if (success) {
        resetForm();
      }
    } else {
      if (errors.taskName) {
        taskNameInputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Todo list</h2>

      <div className="flex flex-col gap-3 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-grow">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Task name"
              className={`w-full px-4 py-2 border ${
                errors.taskName ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              ref={taskNameInputRef}
            />
            {errors.taskName && (
              <p className="text-red-500 text-xs mt-1">{errors.taskName}</p>
            )}
          </div>
          <div className="flex items-center">
            <label className="mr-2 text-sm text-gray-600">Priority:</label>
            <div>
              <input
                type="number"
                min="1"
                max="5"
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value) || 1)}
                className={`w-20 px-4 py-2 border ${
                  errors.priority ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.priority && (
                <p className="text-red-500 text-xs mt-1">{errors.priority}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={taskNote}
            onChange={(e) => setTaskNote(e.target.value)}
            placeholder="Note (optional)"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          />
          <div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`px-4 py-2 border ${
                errors.dueDate ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Add Item
          </button>
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Search
          </button>
          <button
            type="button"
            onClick={confirmDeleteAllTasks}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
