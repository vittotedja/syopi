import { createClient } from '@supabase/supabase-js'

const USER_URL="https://koifrkopfszfixhpvtbz.supabase.co"
const USER_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvaWZya29wZnN6Zml4aHB2dGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1MTYwMDYsImV4cCI6MTk5NDA5MjAwNn0.tsihm_rhtQO6iG3iAI-pMMqqwj8b1xT1O-BGNT_Ld3M"
const supabase = createClient(USER_URL, USER_KEY)

export { supabase }