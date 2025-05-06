import React, { useEffect, useRef } from 'react';

const EditTaskModal = ({
  isOpen,
  onClose,
  editingTask,
  setEditingTask,
  saveEditedTask,
}) => {
  const editTaskNameInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && editTaskNameInputRef.current) {
      editTaskNameInputRef.current.focus();
    }
  }, [isOpen]);

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEditedTask(false);
    }
  };

  if (!editingTask) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Item</h2>
          <span className="text-2xl cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </div>
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
              onKeyDown={handleEditKeyDown}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={editTaskNameInputRef}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note
            </label>
            <input
              type="text"
              value={editingTask.note || ''}
              onChange={(e) =>
                setEditingTask({ ...editingTask, note: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due date
              </label>
              <input
                type="date"
                value={editingTask.dueDate || ''}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, dueDate: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={editingTask.checked || false}
              onChange={(e) =>
                setEditingTask({ ...editingTask, checked: e.target.checked })
              }
              className="mr-2 h-5 w-5 text-blue-500"
            />
            <label className="text-sm text-gray-700">Mark as completed</label>
          </div>
          <button
            type="button"
            onClick={() => saveEditedTask(false)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
