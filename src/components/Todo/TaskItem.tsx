import React, { useState } from 'react';
import { Task } from '../../types/todo';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  AlertTriangle, 
  Edit3, 
  Trash2,
  Calendar,
  Flag
} from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleStatus, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertTriangle;
      case 'medium': return Flag;
      case 'low': return Flag;
      default: return Flag;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-50 border-green-200';
      case 'in_progress': return 'bg-blue-50 border-blue-200';
      default: return 'bg-white border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    return `In ${diffDays} days`;
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'done';

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await onDelete(task.id);
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  const PriorityIcon = getPriorityIcon(task.priority);

  return (
    <div className={`rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${getStatusColor(task.status)} ${
      task.status === 'done' ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start space-x-3">
        {/* Status Toggle */}
        <button
          onClick={() => onToggleStatus(task.id)}
          className="flex-shrink-0 mt-1 transition-colors duration-200"
        >
          {task.status === 'done' ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : task.status === 'in_progress' ? (
            <Clock className="h-5 w-5 text-blue-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400 hover:text-blue-500" />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <h3 className={`font-semibold text-gray-900 ${
                task.status === 'done' ? 'line-through text-gray-500' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${
                  task.status === 'done' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(task)}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                title="Edit task"
              >
                <Edit3 className="h-4 w-4" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200 disabled:opacity-50"
                title="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Task Meta */}
          <div className="flex items-center space-x-4 mt-3">
            {/* Priority */}
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
              <PriorityIcon className="h-3 w-3" />
              <span className="capitalize">{task.priority}</span>
            </div>

            {/* Due Date */}
            {task.due_date && (
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                isOverdue ? 'text-red-600 bg-red-100' : 'text-gray-600 bg-gray-100'
              }`}>
                <Calendar className="h-3 w-3" />
                <span>{formatDate(task.due_date)}</span>
              </div>
            )}

            {/* Status Badge */}
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              task.status === 'done' ? 'text-green-600 bg-green-100' :
              task.status === 'in_progress' ? 'text-blue-600 bg-blue-100' :
              'text-gray-600 bg-gray-100'
            }`}>
              <span className="capitalize">{task.status.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;