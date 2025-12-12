import { apiFetch } from "../apiFetch";

export async function getSkills() {
  const getSkills = await apiFetch("/skills").then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch skills", {
        status: response.status,
      });
    }
    return response.json();
  });
  return getSkills;
}
