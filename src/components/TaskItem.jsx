import React from 'react';
import { formatDate } from '../utils/dateUtils';

const TaskItem = ({
  task,
  draggedTask,
  draggedOverTask,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  toggleTaskCheck,
  openEditModal,
  confirmDeleteTask,
}) => {
  return (
    <li
      key={task.id}
      className={`py-3 flex justify-between items-center ${
        task.checked ? 'bg-gray-50' : ''
      } ${
        draggedTask && draggedTask.id === task.id
          ? 'opacity-50 cursor-grab'
          : 'cursor-grab'
      } ${
        draggedOverTask && draggedOverTask.id === task.id
          ? 'border-t-2 border-blue-500'
          : ''
      }`}
      draggable="true"
      onDragStart={() => handleDragStart(task)}
      onDragOver={(e) => handleDragOver(e, task)}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.checked}
          onChange={() => toggleTaskCheck(task.id)}
          className="mr-3 h-5 w-5 text-blue-500 focus:ring-blue-400"
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <span
              className={`inline-block w-4 h-4 rounded-full mr-2 ${
                task.priority >= 4
                  ? 'bg-red-500'
                  : task.priority >= 3
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
            ></span>
            <span
              className={`text-gray-800 ${
                task.checked ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.name}
            </span>
            {task.dueDate && (
              <span className="ml-2 text-xs text-gray-500">
                Due: {formatDate(task.dueDate)}
              </span>
            )}
          </div>
          {task.note && (
            <span
              className={`text-xs text-gray-500 ml-6 ${
                task.checked ? 'line-through' : ''
              }`}
            >
              {task.note}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => openEditModal(task)}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => confirmDeleteTask(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
