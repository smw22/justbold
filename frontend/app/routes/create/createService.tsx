import { redirect, useLoaderData, useActionData, useNavigation } from "react-router";
import AvatarHeader from "../services/components/AvatarHeader";
import CreateServiceForm from "./components/CreateServiceForm";
import { apiFetch } from "~/lib/apiFetch";
import { categories } from "~/types/services/categories";

export async function clientLoader(): Promise<{}> {
  // TODO: Replace with actual user ID from authentication context
  const userId = "888fe723-82fd-4df5-b39f-ac59ee87a9f1";

  const userResponse = await apiFetch(`/users/${userId}`);

  if (!userResponse.ok) {
    throw new Error(`Failed to load user: ${userResponse.status}`);
  }

  const user = await userResponse.json();

  return { user: user.data };
}

export async function clientAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const media = formData.get("media") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const price = formData.get("price") as string;
  const location = formData.get("location") as string;

  const user_id = "888fe723-82fd-4df5-b39f-ac59ee87a9f1"; // NOTE: Replace with actual logic to get current user ID when we add auth

  if (!title || !content || !category || !price || !location) {
    console.error("Error creating service; Missing fields:", {
      title,
      content,
      category,
      price,
      location,
    });
    return "All fields are required, make sure to fill: title, media, category, content, price and location";
  }

  if (title.length > 100) {
    console.error("Error creating service; Title too long:", title.length);
    return { error: "Title cannot exceed 100 characters" };
  }

  if (title.length < 3) {
    console.error("Error creating service; Title too short:", title.length);
    return { error: "Title must be at least 3 characters long" };
  }

  if (content.length < 10) {
    console.error("Error creating service; Content too short:", content.length);
    return { error: "Description must be at least 10 characters long" };
  }

  if (isNaN(Number(price)) || Number(price) < 0) {
    console.error("Error creating service; Invalid price:", price);
    return { error: "Price must be a valid non-negative number" };
  }

  if (location.length < 3) {
    console.error("Error creating service; Location too short:", location.length);
    return { error: "Location must be at least 3 characters long" };
  }

  try {
    const response = await apiFetch(`/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        title,
        media: media || undefined,
        content,
        price: Number(price),
        location,
        category,
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
  const { user } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex flex-col gap-4 p-4">
      <AvatarHeader imageUrl={user.profile_image} imageSize={40} title={user.name} />
      <CreateServiceForm categories={categories} isSubmitting={isSubmitting} />
      {actionData?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <strong>Error:</strong> {actionData.error}
        </div>
      )}
    </div>
  );
}
