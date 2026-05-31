require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Missing Supabase backend env variables. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env'
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

module.exports = supabase;
