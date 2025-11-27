import { redirect, useLoaderData } from "react-router";
import AvatarHeader from "../services/components/AvatarHeader";
import CreateServiceForm from "./components/CreateServiceForm";

export async function clientLoader(): Promise<{}> {
  const userId = "445338b5-4396-48b3-8d7a-78564776cfb1"; // Replace with actual logic to get current user ID
  const userResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${userId}`
  );

  if (!userResponse.ok) {
    throw new Error(`Failed to load user: ${userResponse.status}`);
  }

  const user = await userResponse.json();

  const tagResponse = await fetch(`${import.meta.env.VITE_API_URL}/tags`);

  if (!tagResponse.ok) {
    throw new Error(`Failed to load tags: ${tagResponse.status}`);
  }

  const tags = await tagResponse.json();

  return { user: user.data, tags: tags.data };
}

export async function clientAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const media = formData.get("media") as string;
  const tag = formData.get("tag") as string;
  const content = formData.get("content") as string;
  const price = formData.get("price") as string;
  const location = formData.get("location") as string;

  const user = "445338b5-4396-48b3-8d7a-78564776cfb1"; // NOTE: Replace with actual logic to get current user ID when we add auth

  if (!title || !content || !tag || !price || !location) {
    throw new Error(
      "All fields are required, make sure to fill: title, media, tag, content, price and location"
    );
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        media: media || undefined,
        tag,
        content,
        price: Number(price),
        location,
        user,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create service");
    }

    if (response.status === 400) {
      const error = await response.json();
      return { error: error.error || "Invalid form data" };
    }

    if (!response.ok) {
      throw new Error(`Failed to create service: ${response.status}`);
    }

    // We can redirect to profile/services page after creation when me make it
    return redirect("/services");
  } catch (error: any) {
    console.error("Network error: ", error.message);
  }
}

export default function CreateService() {
  const { user, tags } = useLoaderData();

  return (
    <div className="flex flex-col gap-4 p-4">
      <AvatarHeader
        imageUrl={user.profile_image}
        imageSize={40}
        title={user.name}
      />
      <CreateServiceForm tags={tags} />
    </div>
  );
}
