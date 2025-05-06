import React from 'react';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  taskToDelete,
  deleteAllConfirm,
}) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Confirm</h2>
          <span className="text-2xl cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="mb-6">
          {deleteAllConfirm ? (
            <p>
              Are you sure you want to delete all tasks? This action cannot be
              undone.
            </p>
          ) : taskToDelete ? (
            <p>
              Are you sure you want to delete "{taskToDelete.name}"? This action
              cannot be undone.
            </p>
          ) : null}
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
