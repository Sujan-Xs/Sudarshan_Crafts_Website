import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testSupabase() {
    console.log('--- Testing Supabase Connection ---');
    
    // 1. Check what is currently in the table
    console.log('Fetching custom_statues...');
    const { data: fetch1, error: err1 } = await supabase.from('custom_statues').select('*');
    if (err1) {
        console.error('❌ Fetch Error:', err1.message);
    } else {
        console.log(`✅ Successfully fetched ${fetch1.length} statues.`);
        console.log(fetch1);
    }

    // 2. Insert a test row
    const testId = 'test-' + Date.now();
    console.log(`\nInserting a test statue (ID: ${testId})...`);
    const { data: insertData, error: err2 } = await supabase.from('custom_statues').insert([{
        id: testId,
        statuename: 'Test Statue',
        material: 'Test Material',
        description: 'Test Description',
        image: 'https://test.com/image.avif'
    }]).select();

    if (err2) {
        console.error('❌ Insert Error:', err2.message);
    } else {
        console.log('✅ Successfully inserted test statue!');
        
        // 3. Fetch again to verify we can read it
        console.log('\nFetching custom_statues again to verify read access...');
        const { data: fetch2, error: err3 } = await supabase.from('custom_statues').select('*');
        if (err3) {
            console.error('❌ Fetch Error:', err3.message);
        } else {
            console.log(`✅ Successfully fetched ${fetch2.length} statues.`);
            const found = fetch2.find(s => s.id === testId);
            if (found) {
                console.log('✅ Test statue is visible in fetch! Everything is working correctly.');
            } else {
                console.error('❌ Test statue is NOT visible in fetch! This means Supabase Row Level Security (RLS) is blocking read access.');
            }
        }
        
        // Clean up test row
        await supabase.from('custom_statues').delete().eq('id', testId);
    }
}

testSupabase();
