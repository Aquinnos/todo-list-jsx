import React, { useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import SearchModal from './components/SearchModal';
import EditTaskModal from './components/EditTaskModal';
import ConfirmModal from './components/ConfirmModal';
import useTasks from './hooks/useTasks';
import useDragAndDrop from './hooks/useDragAndDrop';

const App = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const {
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
  } = useTasks();

  const dragAndDropProps = useDragAndDrop(tasks, setTasks);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <AddTaskForm
        addTask={addTask}
        setIsSearchModalOpen={setIsSearchModalOpen}
        confirmDeleteAllTasks={confirmDeleteAllTasks}
      />

      <TaskList
        tasks={tasks}
        dragAndDropProps={dragAndDropProps}
        toggleTaskCheck={toggleTaskCheck}
        openEditModal={openEditModal}
        confirmDeleteTask={confirmDeleteTask}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        tasks={tasks}
        toggleTaskCheck={toggleTaskCheck}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        saveEditedTask={saveEditedTask}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={deleteAllConfirm ? deleteAllTasks : deleteTask}
        taskToDelete={taskToDelete}
        deleteAllConfirm={deleteAllConfirm}
      />
    </div>
  );
};

export default App;
