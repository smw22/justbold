import { redirect } from "react-router";

type ApiFetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

export async function apiFetch(
  path: string,
  options: ApiFetchOptions = {}
): Promise<Response> {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const url = `${apiUrl}${path}`;

  // Provide your token here (replace with your own auth logic as needed)
  const token = "";

  const headers: Record<string, string> = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  //   if (response.status === 401) {
  //     const currentPath = window.location.pathname + window.location.search;
  //     throw redirect(`/start?redirect=${encodeURIComponent(currentPath)}`);
  //   }

  return response;
}
