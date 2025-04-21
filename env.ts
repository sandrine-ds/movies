import { string, validate } from "valienv";
import dotenv from "dotenv";

dotenv.config();

export const env = validate({
  env: process.env,
  validators: {
    TRAKT_API_KEY: string,
    TMDB_API_KEY: string,
    TMDB_BEARER: string,
    SUPABASE_URL: string,
    SUPABASE_ANON_KEY: string,
    SUPABASE_SERVICE_ROLE_KEY: string,
  },
});
