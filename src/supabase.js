// const API_URL = 'https://zmkxcthlukyogklikryj.supabase.co',
const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpta3hjdGhsdWt5b2drbGlrcnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgxOTA0ODcsImV4cCI6MjAwMzc2NjQ4N30.XwSbOOf41RJdQ66qYOK96lXvMONwc2VcJYhx0PkGe9s'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zmkxcthlukyogklikryj.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = API_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

