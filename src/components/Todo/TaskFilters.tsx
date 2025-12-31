import React from 'react';
import { Filter, CheckCircle, Clock, Circle, Calendar } from 'lucide-react';

interface TaskFiltersProps {
  activeFilter: 'all' | 'todo' | 'in_progress' | 'done';
  onFilterChange: (filter: 'all' | 'todo' | 'in_progress' | 'done') => void;
  taskCounts: {
    all: number;
    todo: number;
    in_progress: number;
    done: number;
  };
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', icon: Filter, count: taskCounts.all },
    { key: 'todo', label: 'To Do', icon: Circle, count: taskCounts.todo },
    { key: 'in_progress', label: 'In Progress', icon: Clock, count: taskCounts.in_progress },
    { key: 'done', label: 'Completed', icon: CheckCircle, count: taskCounts.done }
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center space-x-1 overflow-x-auto">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.key;
          
          return (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                  : 'text-gray-600 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{filter.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'
              }`}>
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskFilters;