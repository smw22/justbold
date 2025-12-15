import { apiFetch } from "../apiFetch";

export async function getTags() {
  const getTags = await apiFetch("/tags").then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch tags", {
        status: response.status,
      });
    }
    return response.json();
  });
  return getTags;
}
