import { apiFetch } from "../apiFetch";

export async function getUser() {
  const getUser = await apiFetch(`/user/`).then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch user", {
        status: response.status,
      });
    }
    return response.json();
  });

  return getUser;
}

export async function getUserById(userId: string) {
  const getUser = await apiFetch(`/user/${userId}`).then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch user", {
        status: response.status,
      });
    }
    return response.json();
  });

  return getUser;
}

export async function getUserPosts(userId: string) {
  const getPosts = await apiFetch(`/user/${userId}/posts`).then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch user posts", {
        status: response.status,
      });
    }
    return response.json();
  });

  return getPosts;
}

export async function getUserReviews(userId: string) {
  const getReviews = await apiFetch(`/user/${userId}/reviews`).then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch user reviews", {
        status: response.status,
      });
    }
    return response.json();
  });

  return getReviews;
}

export async function getUserQuestions(userId: string) {
  const getQuestions = await apiFetch(`/user/${userId}/questions`).then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch user questions", {
        status: response.status,
      });
    }
    return response.json();
  });

  return getQuestions;
}
