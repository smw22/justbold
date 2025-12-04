import type { MetaFunction } from "react-router";
import { redirect, useActionData, useNavigation, useLoaderData, useOutletContext, Form } from "react-router";
import { apiFetch } from "~/lib/apiFetch";

export const meta: MetaFunction = () => {
  return [{ title: "Create Collaboration" }];
};

export async function clientLoader(): Promise<{}> {
  const skillResponse = await apiFetch(`/skills`);
  if (!skillResponse.ok) {
    throw new Error(`Failed to load user skills: ${skillResponse.status}`);
  }
  const skills = await skillResponse.json();

  return { skills: skills.data };
}

export async function clientAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const media = formData.get("media") as File | null;
  const content = formData.get("content") as string;
  const tagIds = formData.getAll("tagIds").filter(Boolean) as string[];
  const genreIds = formData.getAll("genreIds").filter(Boolean) as string[];
  const paid = formData.get("paid") === "on" ? true : undefined;
  const location = formData.get("location") as string;
  const skillIds = formData.getAll("skills").filter(Boolean) as string[];

  const user_id = localStorage.getItem("user_id");

  if (!user_id) {
    return { error: "User not logged in" };
  }

  try {
    const response = await apiFetch(`/collaborations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        media,
        title,
        content,
        genreIds,
        tagIds,
        skillIds,
        paid,
        location,
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
    return redirect("/collaborations");
  } catch (error: any) {
    console.error("Network error: ", error.message);
  }
}

export default function CreateCollaboration() {
  const { skills } = useLoaderData();
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
          <label htmlFor="media">Media (Image/Video) *</label>
          <input type="text" name="media" id="media" accept="image/*,video/*" className={inputStyle} required />
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor="content">Description *</label>
          <textarea name="content" id="content" placeholder="Write your description here..." className={inputStyle} required />
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
        <p className="flex flex-col gap-2">
          <label htmlFor="genreIds">Genre(s) *</label>
          <select name="genreIds" id="genreIds" className={inputStyle} required multiple>
            {genres.map((genre: { id: string; title: string }) => (
              <option key={genre.id} value={genre.id}>
                {genre.title.charAt(0).toUpperCase() + genre.title.slice(1)}
              </option>
            ))}
          </select>
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor="skillIds">Skills</label>
          <select name="skillIds" id="skillIds" className={inputStyle} multiple>
            {skills.map((skill: { id: string; title: string }) => (
              <option key={skill.id} value={skill.id}>
                {skill.title.charAt(0).toUpperCase() + skill.title.slice(1)}
              </option>
            ))}
          </select>
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor="paid" className="flex items-center gap-2">
            <input type="checkbox" name="paid" id="paid" /> Paid
          </label>
        </p>
        <p className="flex flex-col gap-2">
          <label htmlFor="location">Location</label>
          <input type="text" name="location" id="location" placeholder="Copenhagen" className={inputStyle} />
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
