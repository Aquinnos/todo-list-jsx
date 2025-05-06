import { useState, useEffect } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskName, priority, taskNote, dueDate) => {
    if (taskName.trim() !== '') {
      const newTask = {
        id: Date.now(),
        name: taskName,
        priority: priority,
        note: taskNote,
        dueDate: dueDate,
        checked: false,
      };
      setTasks([...tasks, newTask]);
      return true;
    }
    return false;
  };

  const deleteTask = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
      setIsConfirmModalOpen(false);
      setTaskToDelete(null);
      return true;
    }
    return false;
  };

  const deleteAllTasks = () => {
    setTasks([]);
    setIsConfirmModalOpen(false);
    setDeleteAllConfirm(false);
  };

  const saveEditedTask = (markAsCompleted = false) => {
    if (editingTask && editingTask.name.trim() !== '') {
      const updatedTask = {
        ...editingTask,
        checked: markAsCompleted ? true : editingTask.checked,
      };

      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setIsEditModalOpen(false);
      setEditingTask(null);
      return true;
    }
    return false;
  };

  const toggleTaskCheck = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const confirmDeleteTask = (taskId) => {
    const taskToRemove = tasks.find((task) => task.id === taskId);
    setTaskToDelete(taskToRemove);
    setDeleteAllConfirm(false);
    setIsConfirmModalOpen(true);
  };

  const confirmDeleteAllTasks = () => {
    setDeleteAllConfirm(true);
    setIsConfirmModalOpen(false);
    setTaskToDelete(null);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setTaskToDelete(null);
    setDeleteAllConfirm(false);
  };

  return {
    tasks,
    setTasks,
    editingTask,
    setEditingTask,
    taskToDelete,
    deleteAllConfirm,
    isEditModalOpen,
    setIsEditModalOpen,
    isConfirmModalOpen,
    addTask,
    deleteTask,
    deleteAllTasks,
    saveEditedTask,
    toggleTaskCheck,
    openEditModal,
    confirmDeleteTask,
    confirmDeleteAllTasks,
    closeConfirmModal,
  };
};

export default useTasks;
