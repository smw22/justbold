import { apiFetch } from "../apiFetch";

export async function getAllCollaborations() {
  const getCollaborations = await apiFetch("/collaborations").then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch collaborations!!!", {
        status: response.status,
      });
    }
    return response.json();
  });
  return getCollaborations;
}

export async function getCollaboration(collaborationId: string) {
  const getCollaboration = await apiFetch(`/collaborations/${collaborationId}`).then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch collaboration", {
        status: response.status,
      });
    }
    return response.json();
  });
  return getCollaboration;
}
