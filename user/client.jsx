import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.USER_URL, process.env.USER_KEY)

export { supabase }