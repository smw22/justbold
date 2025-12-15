import { redirect } from "react-router";

type ApiFetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

export async function apiFetch(path: string, options: ApiFetchOptions = {}): Promise<Response> {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const url = `${apiUrl}${path}`;

  const token = localStorage.getItem("access_token");

  if (!token) {
    throw redirect(`/onboarding`);
  }

  const headers: Record<string, string> = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      throw redirect(`/login`);
    }

    if (!response.ok) {
      // Let the calling code handle the error
      return response;
    }

    return response;
  } catch (error) {
    // Handle network errors (server offline, connection issues, etc.)
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      // Re-throw network errors to let calling code handle them
      throw error;
    }
    // Re-throw other errors (like redirects)
    throw error;
  }
}
