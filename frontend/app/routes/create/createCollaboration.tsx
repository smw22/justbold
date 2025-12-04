import type { MetaFunction } from "react-router";
import { redirect, useActionData, useNavigation, useOutletContext, Form } from "react-router";
import { apiFetch } from "~/lib/apiFetch";

export const meta: MetaFunction = () => {
  return [{ title: "Create Collaboration" }];
};

export async function clientAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const image = formData.get("image") as File | null;
  const tag_id = formData.get("tag_id") as string;
  const content = formData.get("content") as string;
  const genre = formData.get("genre") as string;
  const skills = formData.get("skills") as string;

  const user_id = localStorage.getItem("user_id");

  if (!user_id) {
    return { error: "User not logged in" };
  }

  // Prepare multipart form data for file upload
  const data = new FormData();
  data.append("title", title);
  if (image) data.append("image", image);
  data.append("tag_id", tag_id);
  data.append("content", content);
  data.append("genre", genre);
  data.append("skills", skills);
  data.append("user_id", user_id);

  try {
    const response = await apiFetch(`/collaborations`, {
      method: "POST",
      body: data,
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
    return redirect("/collaborations");
  } catch (error: any) {
    console.error("Network error: ", error.message);
  }
}

export default function CreateCollaboration() {
  const { tags, genres } = useOutletContext<{
    tags: Array<{ id: string; title: string }>;
    genres: Array<{ id: string; title: string }>;
  }>();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const inputStyle = "bg-light-grey p-4 rounded-lg border border-neutral-grey w-full";

  return (
    <div className="flex flex-col gap-4">
      <Form method="post" className="flex flex-col gap-4" encType="multipart/form-data">
        <p className="flex flex-col gap-2">
          <label htmlFor="title">Title *</label>
          <input type="text" name="title" id="title" placeholder="Studio Session" className={inputStyle} required />
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor="image">Image *</label>
          <input type="file" name="image" id="image" accept="image/*" className={inputStyle} required />
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor="content">Description *</label>
          <textarea name="content" id="content" placeholder="Write your description here..." className={inputStyle} required />
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor="tag_id">Choose a tag *</label>
          <select name="tag_id" id="tag_id" className={inputStyle} required>
            <option value="">-- Select a tag --</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.title.charAt(0).toUpperCase() + tag.title.slice(1)}
              </option>
            ))}
          </select>
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor="genre">Genre *</label>
          <select name="genre" id="genre" className={inputStyle} required>
            <option value="">-- Select a genre --</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.title.charAt(0).toUpperCase() + genre.title.slice(1)}
              </option>
            ))}
          </select>
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor="skills">Must have skills *</label>
          <input type="text" name="skills" id="skills" placeholder="Comma separated skills" className={inputStyle} required />
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-primary-yellow text-black w-fit py-2 px-4 rounded-lg ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Creating..." : "+ Create"}
        </button>
      </Form>
      {actionData?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <strong>Error:</strong> {actionData.error}
        </div>
      )}
    </div>
  );
}
