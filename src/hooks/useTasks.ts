import { useState, useEffect } from 'react';
import { Task, CreateTaskData, UpdateTaskData } from '../types/todo';
import { TaskService } from '../services/taskService';
import { useAuth } from '../contexts/AuthContext';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await TaskService.getTasks(user.id);
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: CreateTaskData): Promise<Task> => {
    if (!user?.id) throw new Error('User not authenticated');

    try {
      const newTask = await TaskService.createTask(user.id, taskData);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateTask = async (taskId: string, updates: UpdateTaskData): Promise<Task> => {
    try {
      const updatedTask = await TaskService.updateTask(taskId, updates);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      return updatedTask;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update task';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteTask = async (taskId: string): Promise<void> => {
    try {
      await TaskService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete task';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const toggleTaskStatus = async (taskId: string): Promise<void> => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newStatus = task.status === 'done' ? 'todo' : 'done';
    await updateTask(taskId, { status: newStatus });
  };

  useEffect(() => {
    fetchTasks();
  }, [user?.id]);

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return {
    tasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    refetch: fetchTasks
  };
};