/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Remove custom ImportMetaEnv and ImportMeta interfaces; Vite provides these types automatically.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);