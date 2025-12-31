import React from 'react';
import { Task } from '../../types/todo';
import { CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const overdueTasks = tasks.filter(task => 
    task.due_date && 
    new Date(task.due_date) < new Date() && 
    task.status !== 'done'
  ).length;
  const upcomingTasks = tasks.filter(task => 
    task.due_date && 
    new Date(task.due_date) >= new Date() && 
    task.status !== 'done'
  ).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Completed',
      value: completedTasks.toString(),
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Upcoming',
      value: upcomingTasks.toString(),
      icon: Clock,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      label: 'Overdue',
      value: overdueTasks.toString(),
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskStats;