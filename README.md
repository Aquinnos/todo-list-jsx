# Todo List App

Todo List application built with React and styled with TailwindCSS.

## Features

- ✅ Create, edit, and delete tasks
- 🔍 Search tasks with dynamic results
- 🗑️ Delete single or all tasks with confirmation
- ✓ Mark tasks as completed
- 🔢 Set task priority (1-5) with visual indicators
- 📅 Add due dates to tasks
- 📝 Add notes to tasks
- 🧠 Remember tasks between sessions using localStorage
- 🖱️ Drag and drop to reorder tasks
- 📱 Responsive design for all screen sizes

## Project Structure

The project is organized into a modular, maintainable structure:

```
src/
├── components/        # UI components
│   ├── AddTaskForm.jsx    # Task creation form
│   ├── ConfirmModal.jsx   # Confirmation dialog
│   ├── EditTaskModal.jsx  # Task editing modal
│   ├── SearchModal.jsx    # Search functionality
│   ├── TaskItem.jsx       # Individual task component
│   └── TaskList.jsx       # Task list container
├── hooks/             # Custom React hooks
│   ├── useDragAndDrop.js  # Drag and drop functionality
│   └── useTasks.js        # Task management logic
├── utils/             # Utility functions
│   └── dateUtils.js       # Date formatting helpers
├── App.jsx            # Main application component
├── index.css          # Global styles
└── main.jsx           # Application entry point
```

## Technologies Used

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - Styling
- Browser localStorage - Client-side storage

## Getting Started

### Prerequisites

- Node.js (v16.0 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Aquinnos/todo-list-jsx.git
cd todo-list-jsx
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

## Usage

- **Adding Tasks**: Fill in the task name, priority, optional note and due date, then click "Add Item" or press Enter
- **Completing Tasks**: Click the checkbox next to a task to mark it as complete
- **Editing Tasks**: Click the "Edit" button on a task to open the edit modal
- **Deleting Tasks**: Click the "Delete" button on a task to remove it (confirmation required)
- **Searching Tasks**: Click the "Search" button to find specific tasks
- **Reordering Tasks**: Drag and drop tasks to change their order

## License

This project is licensed under the MIT License - see the LICENSE file for details.
