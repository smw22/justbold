import { apiFetch } from "~/lib/apiFetch";

export async function getAllServices() {
  const getServices = await apiFetch("/services").then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch services", {
        status: response.status,
      });
    }
    return response.json();
  });
  return getServices;
}

export async function getService(serviceId: string) {
  const getService = await apiFetch(`/services/${serviceId}`).then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch service", {
        status: response.status,
      });
    }
    return response.json();
  });
}
