import { createClient } from '@supabase/supabase-js'

const USER_URL="https://vfwutkszblcagklnogww.supabase.co"
const USER_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmd3V0a3N6YmxjYWdrbG5vZ3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA1MjgzMjMsImV4cCI6MTk5NjEwNDMyM30.lnZFhmeQPQoGd0Lq8cxUIN9fkOJxYoYfCGf-odc4NqY"
const supabase = createClient(USER_URL, USER_KEY, {persistSession: true})

export { supabase }