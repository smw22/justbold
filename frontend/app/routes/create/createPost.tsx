import type { MetaFunction } from "react-router";
import { redirect, useActionData, useNavigation, useOutletContext, Form } from "react-router";
import { apiFetch } from "~/lib/apiFetch";

export const meta: MetaFunction = () => {
  return [{ title: "Create Post" }];
};

export async function clientAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const media = formData.get("media") as string | null;
  const tagIds = formData.getAll("tagIds").filter(Boolean) as string[];

  if (!title || !content || !tagIds.length) {
    return { error: "Please fill in all required fields." };
  }

  const postData = {
    title,
    content,
    media: media || undefined,
    tagIds,
  };

  try {
    const response = await apiFetch(`/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const error = await response.json();
        return { error: error.error || "Invalid form data" };
      }
      throw new Error(`Failed to create post: ${response.status}`);
    }

    return redirect("/");
  } catch (error: any) {
    console.error("Network error: ", error.message);
    return { error: error.message };
  }
}

export default function CreatePost() {
  const { tags } = useOutletContext<{
    tags: Array<{ id: string; title: string }>;
  }>();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const inputStyle = "bg-light-grey p-4 rounded-lg border border-neutral-grey w-full";

  return (
    <div className="flex flex-col gap-4">
      <Form method="post" className="flex flex-col gap-4">
        <p className="flex flex-col gap-2">
          <label htmlFor="title">Title *</label>
          <input type="text" name="title" id="title" placeholder="Post Title" className={inputStyle} required />
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor="media">Media (URL)</label>
          <input type="url" name="media" id="media" placeholder="https://example.com/image.jpg" className={inputStyle} />
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor="content">Content *</label>
          <textarea name="content" id="content" placeholder="Write your post content here..." className={inputStyle} required />
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor="tagIds">Choose tag(s) *</label>
          <select name="tagIds" id="tagIds" className={inputStyle} required multiple>
            {tags.map((tag: { id: string; title: string }) => (
              <option key={tag.id} value={tag.id}>
                {tag.title.charAt(0).toUpperCase() + tag.title.slice(1)}
              </option>
            ))}
          </select>
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
