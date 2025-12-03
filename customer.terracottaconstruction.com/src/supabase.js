import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://usugrvpakjpkazerszqu.supabase.co'; // your project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJycmpndHdma3p0ZWd2cmNqc2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NTQwOTQsImV4cCI6MjA2MzQzMDA5NH0.zl7_WMtV3aO4_GN88SmqNRd8RlFNa_Q5tOcKXXViAwY'; // replace this with the public anon key

export const supabase = createClient(supabaseUrl, supabaseKey);