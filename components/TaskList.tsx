
import React, { useState } from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  overview: string;
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, overview, onAddTask, onToggleTask, onDeleteTask }) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      onAddTask(newTaskText);
      setNewTaskText('');
    }
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-700 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Your Mission</h2>
        <span className="text-sm font-medium text-gray-300 bg-gray-700 px-3 py-1 rounded-full">{completedCount} / {tasks.length}</span>
      </div>
      
      {overview && (
        <div className="mb-6 p-4 bg-gray-900/70 rounded-lg border border-indigo-500/30">
            <h3 className="font-semibold text-lg text-indigo-300 mb-2">Mission Overview</h3>
            <p className="text-gray-300 text-sm whitespace-pre-line">{overview}</p>
        </div>
      )}

      <h3 className="text-xl font-bold text-white mb-4">Agenda</h3>
      <div className="flex-grow overflow-y-auto pr-2 -mr-2 max-h-[calc(100vh-450px)]">
        {tasks.length > 0 ? (
          <ul className="space-y-3">
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} />
            ))}
          </ul>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400">No tasks yet. Add one to begin construction!</p>
          </div>
        )}
      </div>
      <form onSubmit={handleAddTask} className="mt-6 flex gap-2">
        <input
          type="text"
          value={newTaskText}
          onChange={e => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
        <button type="submit" className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50" disabled={!newTaskText.trim()}>
          Add
        </button>
      </form>
    </div>
  );
};

export default TaskList;