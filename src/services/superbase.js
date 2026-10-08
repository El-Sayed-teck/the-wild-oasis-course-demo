
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://ypfvcqdvrueuumvwafov.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZnZjcWR2cnVldXVtdndhZm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNjU5MjcsImV4cCI6MjEwMjk0MTkyN30.1Qe0iH5VaR_Rww7_9dz9oiUK0l0p591a2EPMusfklQc'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase