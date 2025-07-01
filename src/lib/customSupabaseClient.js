import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mxnkqsvhrvsrweewzrgt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14bmtxc3ZocnZzcndlZXd6cmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNjMyMTQsImV4cCI6MjA2NjkzOTIxNH0.PNz828CU8-wa0QzvJEI_iqlAEXln73FNn8yw-Jy2CeQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);