# Todo App for Airtable Extensions

This is a React-based to-do list application designed to work as an Airtable extension. The app leverages Airtable
Blocks API to allow users to interact with their Airtable base, enabling them to manage tasks with features such as
priority sorting, task completion, and deletion.

> This app is an example of what can be achieved using Airtable Extension, as part of the Airtable Developer program
> Made by Ambroise Dhenain on December 2024

## Features

### 1. **Table and View Selection**

- Users can choose a specific table and view from their Airtable base using dropdown menus.

### 2. **Field Configuration**

- Supports configuration for:
    - A "done" field to mark tasks as complete.
    - A "priority" field to sort tasks based on priority levels.

### 3. **Task Management**

- **Add Tasks:** Create new tasks by entering a name and optionally specifying a priority.
- **Mark Tasks as Done:** Use a checkbox to mark tasks as complete.
- **Delete Tasks:** Remove tasks from the list.
- **Priority Sorting:** Automatically sort tasks by their priority for better organization.

### 4. **Responsive Design**

- The app interface is designed to be user-friendly and integrates seamlessly into the Airtable environment.

## How It Works

1. **Setup Configuration:**
    - Select the Airtable table and view you want to use.
    - Configure the "done" field (checkbox) and "priority" field (single-line text).

2. **Task Display:**
    - Tasks from the selected view are displayed with their priority.
    - Tasks are sorted in ascending order of priority if a priority field is configured.

3. **Interacting with Tasks:**
    - Click the checkbox to mark a task as complete.
    - Click the "x" button to delete a task.
    - Click on a task name to expand its record in Airtable.

4. **Add New Tasks:**
    - Use the input fields to add a new task name and priority.
    - Click "Add" to save the task to Airtable.

## Setup Instructions

1. Clone the repository and install dependencies:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   npm install
   ```

2. Run the app in the Airtable Blocks development environment:
   ```bash
   block run
   ```

3. Open Airtable, add the extension to your base, and configure the settings to start managing tasks.

## Requirements

- **Airtable Account:** Required to use Airtable Blocks.
- **Airtable Base:** A base with at least one table and a view.
- **Node.js:** To run the development server.

## Code Structure

### Main Components

- **`TodoApp`**: The root component handling configuration and rendering tasks.
- **`Task`**: Represents an individual task, including actions for marking as done and deleting.
- **`AddTaskForm`**: A form to add new tasks with a name and priority.

### Key Libraries

- **Airtable Blocks UI**: Provides UI components for interacting with Airtable.
- **React**: Framework for building the UI.

## Customization

Feel free to extend or modify the app to include additional features such as:

- Task filtering by status.
- Enhanced priority levels (e.g., using dropdowns).
- Notifications for task updates.

## License

This project is licensed under the MIT License.

