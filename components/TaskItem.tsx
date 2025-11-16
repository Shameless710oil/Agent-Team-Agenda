
import React, { useState } from 'react';
import { Task } from '../types';
import { TrashIcon, CheckIcon, ChevronDownIcon } from './Icons';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the dropdown from toggling when deleting
    onDelete(task.id);
  };

  const hasInstructions = task.instructions && task.instructions.trim().length > 0;

  return (
    <li className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden transition-all duration-300">
      <div
        className={`flex items-center gap-3 p-3 transition-colors duration-200 ${hasInstructions ? 'cursor-pointer' : ''} hover:bg-gray-800/50`}
        onClick={() => hasInstructions && setIsOpen(!isOpen)}
        role={hasInstructions ? 'button' : undefined}
        aria-expanded={isOpen}
        tabIndex={hasInstructions ? 0 : -1}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && hasInstructions) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task.id);
          }}
          className={`w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center border-2 transition-all ${
            task.isCompleted
              ? 'bg-green-500 border-green-500'
              : 'bg-gray-700 border-gray-500 hover:border-green-400'
          }`}
          aria-label={task.isCompleted ? 'Mark task as incomplete' : 'Mark task as complete'}
        >
          {task.isCompleted && <CheckIcon className="w-4 h-4 text-white" />}
        </button>
        <span className={`flex-grow text-gray-200 ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
          {task.text}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
            <button
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-400 transition-colors p-1 rounded-full"
                aria-label="Delete task"
            >
                <TrashIcon className="w-5 h-5" />
            </button>
            {hasInstructions && (
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            )}
        </div>
      </div>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
            <div className="text-gray-300 px-4 pb-4 text-sm leading-relaxed whitespace-pre-line">
                {task.instructions}
            </div>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;