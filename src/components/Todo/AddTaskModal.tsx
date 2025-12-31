import React, { useState, useEffect } from 'react';
import { Task, CreateTaskData, UpdateTaskData } from '../../types/todo';
import { X, Plus, Save, Calendar, Flag, FileText } from 'lucide-react';

// interface AddTaskModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (taskData: CreateTaskData | UpdateTaskData) => Promise<void>;
//   editingTask?: Task | null;
// }
type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: any) => void;
  editingTask?: Task | null;
};


const AddTaskModal: React.FC<AddTaskModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingTask 
}) => {
  const [formData, setFormData] = useState<CreateTaskData>({
    title: '',
    description: '',
    priority: 'medium',
    due_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        priority: editingTask.priority,
        due_date: editingTask.due_date ? editingTask.due_date.split('T')[0] : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        due_date: ''
      });
    }
    setError('');
  }, [editingTask, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description?.trim() || undefined,
        due_date: formData.due_date || undefined
      };

      await onSubmit(submitData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
            {editingTask ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            <span>{editingTask ? 'Edit Task' : 'Add New Task'}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Submit application to XYZ College"
              className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 py-2.5"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add any additional details..."
                rows={3}
                className="pl-10 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          </div>

          {/* Priority and Due Date Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <div className="relative">
                <Flag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="pl-10 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 py-2.5"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  id="due_date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="pl-10 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 py-2.5"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.title.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : editingTask ? (
                <Save className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span>{loading ? 'Saving...' : editingTask ? 'Update Task' : 'Add Task'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;