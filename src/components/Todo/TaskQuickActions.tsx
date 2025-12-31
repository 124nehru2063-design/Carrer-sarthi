import React from 'react';
import { Task } from '../../types/todo';
import { CheckCircle, Clock, AlertTriangle, Calendar, Plus } from 'lucide-react';

interface TaskQuickActionsProps {
  tasks: Task[];
  onAddTask: () => void;
}

const TaskQuickActions: React.FC<TaskQuickActionsProps> = ({ tasks, onAddTask }) => {
  const upcomingTasks = tasks.filter(task => 
    task.due_date && 
    new Date(task.due_date) >= new Date() && 
    task.status !== 'done'
  ).slice(0, 3);

  const overdueTasks = tasks.filter(task => 
    task.due_date && 
    new Date(task.due_date) < new Date() && 
    task.status !== 'done'
  ).length;

  const commonTasks = [
    'Submit college application',
    'Prepare for entrance exam',
    'Research scholarship options',
    'Schedule campus visit',
    'Complete document verification',
    'Apply for hostel accommodation'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      {/* Urgent Tasks Alert */}
      {overdueTasks > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="text-red-700 font-medium">
              {overdueTasks} overdue task{overdueTasks > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}

      {/* Upcoming Tasks */}
      {upcomingTasks.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Upcoming Deadlines</span>
          </h4>
          <div className="space-y-2">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700 truncate">{task.title}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {task.due_date && new Date(task.due_date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Add Common Tasks */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Common Tasks</h4>
        <div className="space-y-2">
          {commonTasks.slice(0, 4).map((taskTitle, index) => (
            <button
              key={index}
              onClick={onAddTask}
              className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-3 w-3 text-gray-400" />
              <span>{taskTitle}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskQuickActions;