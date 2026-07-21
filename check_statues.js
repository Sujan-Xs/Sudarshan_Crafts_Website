import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
    const { data: statues, error } = await supabase.from('custom_statues').select('*');
    if (error) {
        console.error('Error fetching statues:', error);
    } else {
        console.log('Statues in database:', statues);
    }
}

checkData();
