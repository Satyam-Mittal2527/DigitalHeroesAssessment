import { createClient } from "@supabase/supabase-js";
import settings from "../core/config.js";

// console.log(settings.SUPABASE_ANON_KEY)
export const supabase = createClient(
  settings.SUPABASE_URL,
  settings.SUPABASE_ANON_KEY
);

export const supabase_admin = createClient(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_ROLE_KEY
)
