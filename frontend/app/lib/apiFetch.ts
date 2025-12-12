import { redirect } from "react-router";

type ApiFetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

export async function apiFetch(path: string, options: ApiFetchOptions = {}): Promise<Response> {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  const url = `${apiUrl}${path}`;

  const token = localStorage.getItem("access_token");

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
      // If user has a token, don't redirect - let the calling code handle the error
      if (token) {
        return response;
      }
      throw redirect(`/onboarding`);
    }

    return response;
  } catch (error) {
    // Handle network errors (server offline, connection issues, etc.)
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      // If user has a token, don't redirect - let the calling code handle the error
      if (token) {
        // Return a mock response that indicates the error
        throw error;
      }
      throw redirect(`/onboarding`);
    }
    // Re-throw other errors (like redirects)
    throw error;
  }
}
