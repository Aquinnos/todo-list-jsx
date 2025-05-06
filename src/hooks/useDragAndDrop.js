import { useState } from 'react';

const useDragAndDrop = (tasks, setTasks) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedOverTask, setDraggedOverTask] = useState(null);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e, task) => {
    e.preventDefault();
    if (draggedTask && task.id !== draggedTask.id) {
      setDraggedOverTask(task);
    }
  };

  const handleDragEnd = () => {
    if (draggedTask && draggedOverTask) {
      const tasksCopy = [...tasks];
      const draggedTaskIndex = tasksCopy.findIndex(
        (task) => task.id === draggedTask.id
      );
      const draggedOverTaskIndex = tasksCopy.findIndex(
        (task) => task.id === draggedOverTask.id
      );

      const [removedTask] = tasksCopy.splice(draggedTaskIndex, 1);

      tasksCopy.splice(draggedOverTaskIndex, 0, removedTask);

      setTasks(tasksCopy);
    }

    setDraggedTask(null);
    setDraggedOverTask(null);
  };

  return {
    draggedTask,
    draggedOverTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

export default useDragAndDrop;
