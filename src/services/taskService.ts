import { supabase } from '../lib/supabase';
import { Task, CreateTaskData, UpdateTaskData } from '../types/todo';

export class TaskService {
  static async getTasks(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch tasks: ${error.message}`);
    }

    return data || [];
  }

  static async createTask(userId: string, taskData: CreateTaskData): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: userId,
        ...taskData,
        status: 'todo'
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create task: ${error.message}`);
    }

    return data;
  }

  static async updateTask(taskId: string, updates: UpdateTaskData): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', taskId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update task: ${error.message}`);
    }

    return data;
  }

  static async deleteTask(taskId: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      throw new Error(`Failed to delete task: ${error.message}`);
    }
  }

  static async getTasksByStatus(userId: string, status: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch tasks by status: ${error.message}`);
    }

    return data || [];
  }

  static async getUpcomingTasks(userId: string): Promise<Task[]> {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .gte('due_date', today)
      .neq('status', 'done')
      .order('due_date', { ascending: true })
      .limit(5);

    if (error) {
      throw new Error(`Failed to fetch upcoming tasks: ${error.message}`);
    }

    return data || [];
  }
}