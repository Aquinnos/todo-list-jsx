import React, { useState, useEffect, useRef } from 'react';
import { formatDate } from '../utils/dateUtils';

const SearchModal = ({ isOpen, onClose, tasks, toggleTaskCheck }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
      setSearchTerm('');
      setSearchResults([]);
    }
  }, [isOpen]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setSearchResults([]);
    } else {
      const results = tasks.filter(
        (task) =>
          task.name.toLowerCase().includes(term.toLowerCase()) ||
          (task.note && task.note.toLowerCase().includes(term.toLowerCase()))
      );
      setSearchResults(results);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Search Tasks</h2>
          <span className="text-2xl cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
              ref={searchInputRef}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
          {searchResults.length > 0 ? (
            searchResults.map((task) => (
              <li
                key={task.id}
                className="py-2 flex justify-between items-center hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => toggleTaskCheck(task.id)}
                    className="mr-2 h-4 w-4 text-blue-500"
                  />
                  <span
                    className={`inline-block w-4 h-4 rounded-full mr-2 ${
                      task.priority >= 4
                        ? 'bg-red-500'
                        : task.priority >= 3
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  ></span>
                  <div className="flex flex-col">
                    <span
                      className={
                        task.checked ? 'line-through text-gray-500' : ''
                      }
                    >
                      {task.name}
                    </span>
                    {task.note && (
                      <span className="text-xs text-gray-500">{task.note}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {task.dueDate && (
                    <span className="text-xs text-gray-500">
                      {formatDate(task.dueDate)}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    Priority: {task.priority}
                  </span>
                </div>
              </li>
            ))
          ) : searchTerm ? (
            <li className="py-2 text-gray-500 text-center">
              No matching tasks found
            </li>
          ) : (
            <li className="py-2 text-gray-500 text-center">
              Type to search tasks
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchModal;
