import React, { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(1);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = () => {
    if (taskName.trim() !== '') {
      const newTask = {
        id: Date.now(),
        name: taskName,
        priority: priority,
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setPriority(1);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const saveEditedTask = () => {
    if (editingTask && editingTask.name.trim() !== '') {
      setTasks(
        tasks.map((task) => (task.id === editingTask.id ? editingTask : task))
      );
      setIsEditModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const results = tasks.filter((task) =>
      task.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl h-[100dvh] bg-[#222222]">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Todo list</h2>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Add a new item */}
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task name"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          />
          <input
            type="number"
            min="1"
            max="5"
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value))}
            className="w-20 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addTask}
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
            onClick={deleteAllTasks}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Delete All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          List of items
        </h2>
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="py-3 flex justify-between items-center"
            >
              <div className="flex items-center">
                <span
                  className={`inline-block w-6 h-6 rounded-full mr-3 ${
                    task.priority >= 4
                      ? 'bg-red-500'
                      : task.priority >= 3
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                ></span>
                <span className="text-gray-800">{task.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(task)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {tasks.length === 0 && (
            <li className="py-3 text-gray-500 text-center">
              No tasks added yet
            </li>
          )}
        </ul>
      </div>

      {/* Modal for searching tasks */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
          isSearchModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Search Results</h2>
            <span
              className="text-2xl cursor-pointer"
              onClick={() => setIsSearchModalOpen(false)}
            >
              &times;
            </span>
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="modalSearchInput"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Search results will be displayed here */}
          <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
            {searchResults.map((task) => (
              <li
                key={task.id}
                className="py-2 flex justify-between items-center"
              >
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
                  <span>{task.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  Priority: {task.priority}
                </span>
              </li>
            ))}
            {searchTerm && searchResults.length === 0 && (
              <li className="py-2 text-gray-500 text-center">
                No matching tasks found
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Modal for editing tasks */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
          isEditModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Edit Item</h2>
            <span
              className="text-2xl cursor-pointer"
              onClick={() => setIsEditModalOpen(false)}
            >
              &times;
            </span>
          </div>
          {editingTask && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task name
                </label>
                <input
                  type="text"
                  value={editingTask.name}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editingTask.priority}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      priority: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                id="saveEditBtn"
                onClick={saveEditedTask}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
