import { Database } from '@/types/schema';
import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://cdqhdekytbasufwplngr.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey!);
export default supabase;
