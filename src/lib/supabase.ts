/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Remove custom ImportMetaEnv and ImportMeta interfaces; Vite provides these types automatically.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}
// src/services/taskService.ts
const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/api/tasks`);
  return res.json();
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);