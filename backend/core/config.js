import dotenv from "dotenv";

dotenv.config();
// console.log({
//     URL: process.env.SUPABASE_URL,
//     ANON: process.env.SUPABASE_ANION_KEY,
//     PUBLISHABLE: process.env.SUPABASE_PUBLISHABLE_KEY,
//     SERVICE: process.env.SUPABASE_SERVICE_ROLE_KEY,
// });
class settings {
  static SUPABASE_URL = process.env.SUPABASE_URL;
  static SUPABASE_ANON_KEY = process.env.SUPABASE_ANION_KEY;
  static SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
  static SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
}

export default settings;