import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!

const supabaseAdmin = createClient(supabaseURL, supabaseKey)

export default supabaseAdmin;