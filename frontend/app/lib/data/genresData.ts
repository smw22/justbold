import { apiFetch } from "../apiFetch";

export async function getGenres() {
  const getGenres = await apiFetch("/genres").then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch genres", {
        status: response.status,
      });
    }
    return response.json();
  });
  return getGenres;
}
