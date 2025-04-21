import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createClient } from "@supabase/supabase-js";
import { env } from "../env.ts";
import type { Database } from "./types/supabase.ts";

const supabaseUrl = env.SUPABASE_URL;
const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseServiceRoleKey
);

const tmdbBearer = process.env.TMDB_BEARER;

const app = new Hono();

export const API_URL = "https://api.themoviedb.org/3";

// POPULAR
app.get("/movies/popular/:page", async (c) => {
  const page = c.req.param("page");

  const url = `${API_URL}/movie/popular?language=en-US&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbBearer}`,
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      return c.json({ ok: false, error: "Ooops there's an error" });
    }

    const data = await res.json();
    return c.json({ ok: true, results: data });
  } catch (error) {
    return c.json({ ok: false, error: (error as Error).message }, 500);
  }
});

// UPCOMING
app.get("/movies/upcoming/:page", async (c) => {
  const page = c.req.param("page");

  const url = `${API_URL}/movie/upcoming?language=en-US&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbBearer}`,
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      return c.json({ ok: false, error: "Ooops there's an error" });
    }

    const data = await res.json();
    return c.json({ ok: true, results: data });
  } catch (error) {
    return c.json({ ok: false, error: (error as Error).message }, 500);
  }
});

// MOVIE BY ID
app.get("/movies/upcoming/:movieId", async (c) => {
  const movieId = c.req.param("movieId");

  const url = `${API_URL}/movie/${movieId}?language=en-US`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbBearer}`,
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      return c.json({ ok: false, error: "Ooops there's an error" });
    }

    const data = await res.json();
    return c.json({ ok: true, results: data });
  } catch (error) {
    return c.json({ ok: false, error: (error as Error).message }, 500);
  }
});

// SAVED MOVIES
app.get("/movies/saved", async (c) => {
  try {
    const { data, error } = await supabase.from("Saved").select("*");

    if (error) {
      c.json({ ok: false, error: (error as Error).message }, 500);
    }
    return c.json({ saved: data });
  } catch (error) {
    return c.json({ ok: false, error: (error as Error).message }, 500);
  }

  // TODO: fetch data from TMBD with movie ID
});

//SEARCH
app.get("/movies/upcoming/:movieId", async (c) => {
  const query = c.req.param("query");
  const page = c.req.param("page");

  const url = `${API_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbBearer}`,
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      return c.json({ ok: false, error: "Ooops there's an error" });
    }

    const data = await res.json();
    return c.json({ ok: true, results: data });
  } catch (error) {
    return c.json({ ok: false, error: (error as Error).message }, 500);
  }
});

// RATED MOVIES
app.get("/movies/rated", async (c) => {
  try {
    const { data, error } = await supabase.from("Rated").select("*");

    if (error) {
      c.json({ ok: false, error: (error as Error).message }, 500);
    }
    return c.json({ saved: data });
  } catch (error) {
    return c.json({ ok: false, error: (error as Error).message }, 500);
  }

  // TODO: fetch data from TMBD with movie ID
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
