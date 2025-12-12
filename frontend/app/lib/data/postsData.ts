import { apiFetch } from "../apiFetch";

export async function getAllPosts() {
  const getPosts = await apiFetch("/posts").then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch posts", {
        status: response.status,
      });
    }
    return response.json();
  });
  return getPosts;
}

export async function getPost(postId: string) {
  const getPost = await apiFetch(`/posts/${postId}`).then(async (response) => {
    if (!response.ok) {
      throw new Response("Failed to fetch post", {
        status: response.status,
      });
    }
    return response.json();
  });
  return getPost;
}
