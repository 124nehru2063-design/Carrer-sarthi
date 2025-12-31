import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { Task, CreateTaskData, UpdateTaskData } from '../types/todo';
import TaskItem from '../components/Todo/TaskItem';
import AddTaskModal from '../components/Todo/AddTaskModal';
import TaskFilters from '../components/Todo/TaskFilters';
import TaskStats from '../components/Todo/TaskStats';
import TaskQuickActions from '../components/Todo/TaskQuickActions';
import { 
  Plus, 
  CheckSquare, 
  Search, 
  SortAsc, 
  Calendar,
  AlertCircle
} from 'lucide-react';

const TodoPage: React.FC = () => {
  const { user } = useAuth();
  const { 
    tasks, 
    todoTasks, 
    inProgressTasks, 
    doneTasks, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    toggleTaskStatus 
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'todo' | 'in_progress' | 'done'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'created_at' | 'due_date' | 'priority'>('created_at');

  const handleAddTask = async (taskData: CreateTaskData) => {
    await createTask(taskData);
  };

  const handleEditTask = async (taskData: UpdateTaskData) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    // Filter by status
    switch (activeFilter) {
      case 'todo':
        filteredTasks = todoTasks;
        break;
      case 'in_progress':
        filteredTasks = inProgressTasks;
        break;
      case 'done':
        filteredTasks = doneTasks;
        break;
      default:
        filteredTasks = tasks;
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort tasks
    return filteredTasks.sort((a, b) => {
      switch (sortBy) {
        case 'due_date':
          if (!a.due_date && !b.due_date) return 0;
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
  };

  const filteredTasks = getFilteredTasks();

  const taskCounts = {
    all: tasks.length,
    todo: todoTasks.length,
    in_progress: inProgressTasks.length,
    done: doneTasks.length
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Please log in</h2>
          <p className="text-gray-600">You need to be logged in to access your tasks.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
                <p className="text-gray-600">Manage your career planning tasks and deadlines</p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <Plus className="h-5 w-5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Filters and Search */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <TaskFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              taskCounts={taskCounts}
            />
          </div>
          
          <div className="flex space-x-2">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 py-2.5"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <SortAsc className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'created_at' | 'due_date' | 'priority')}
                className="pl-10 pr-8 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 py-2.5 appearance-none bg-white"
              >
                <option value="created_at">Latest</option>
                <option value="due_date">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading tasks...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Tasks List */}
            {filteredTasks.length > 0 ? (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleStatus={toggleTaskStatus}
                    onEdit={openEditModal}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200 text-center">
                <CheckSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchQuery ? 'No tasks found' : 'No tasks yet'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Create your first task to start organizing your career planning activities'
                  }
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Your First Task</span>
                  </button>
                )}
              </div>
            )}
          </>
        )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TaskQuickActions tasks={tasks} onAddTask={() => setIsModalOpen(true)} />
          </div>
        </div>

        {/* Quick Add Suggestions */}
        {tasks.length === 0 && !loading && (
          <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Get Started with These Common Tasks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Complete college application form',
                'Prepare for entrance exam',
                'Research scholarship opportunities',
                'Schedule counseling session',
                'Submit required documents',
                'Visit college campus'
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsModalOpen(true);
                    // Pre-fill the modal with suggestion
                    setTimeout(() => {
                      const titleInput = document.getElementById('title') as HTMLInputElement;
                      if (titleInput) titleInput.value = suggestion;
                    }, 100);
                  }}
                  className="text-left p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <Plus className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add/Edit Task Modal */}
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          editingTask={editingTask}
        />
      </div>
    </div>
  );
};

export default TodoPage;