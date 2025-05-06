import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  dragAndDropProps,
  toggleTaskCheck,
  openEditModal,
  confirmDeleteTask,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        List of items
      </h2>
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            draggedTask={dragAndDropProps.draggedTask}
            draggedOverTask={dragAndDropProps.draggedOverTask}
            handleDragStart={dragAndDropProps.handleDragStart}
            handleDragOver={dragAndDropProps.handleDragOver}
            handleDragEnd={dragAndDropProps.handleDragEnd}
            toggleTaskCheck={toggleTaskCheck}
            openEditModal={openEditModal}
            confirmDeleteTask={confirmDeleteTask}
          />
        ))}
        {tasks.length === 0 && (
          <li className="py-3 text-gray-500 text-center">No tasks added yet</li>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
