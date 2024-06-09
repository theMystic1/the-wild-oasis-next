import { createClient } from "@supabase/supabase-js";

// using the environmental variables created in the ,env,local file
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
