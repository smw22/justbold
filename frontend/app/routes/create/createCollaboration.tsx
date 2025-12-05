import type { MetaFunction } from "react-router";
import { redirect, useActionData, useNavigation, useLoaderData, useOutletContext, Form } from "react-router";
import Button from "~/components/Button";
import Input from "~/components/Input";
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
  const skillIds = formData.getAll("skillIds").filter(Boolean) as string[];
  const role = formData.get("role") as string;

  const user_id = localStorage.getItem("user_id");

  if (!user_id) {
    return { error: "User not logged in" };
  }

  const CollabData = {
    media,
    title,
    content,
    role,
    paid,
    location,
    genreIds,
    tagIds,
    skillIds,
  };

  console.log(CollabData);

  try {
    const response = await apiFetch(`/collaborations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CollabData),
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

  return (
    <div className="flex flex-col gap-4">
      <Form method="post" className="flex flex-col gap-4" encType="multipart/form-data">
        <Input type="text" name="title" id="title" placeholder="Title *" required />
        <Input type="url" name="media" id="media" placeholder="Media (Image/Video) *" accept="image/*,video/*" required />
        <Input textarea name="content" id="content" placeholder="Write your description here..." required />
        <select
          name="tagIds"
          id="tagIds"
          className="bg-light-grey p-4 rounded-lg border border-neutral-grey w-full"
          required
          multiple
        >
          {tags.map((tag: { id: string; title: string }) => (
            <option key={tag.id} value={tag.id}>
              {tag.title.charAt(0).toUpperCase() + tag.title.slice(1)}
            </option>
          ))}
        </select>
        <select
          name="genreIds"
          id="genreIds"
          className="bg-light-grey p-4 rounded-lg border border-neutral-grey w-full"
          required
          multiple
        >
          {genres.map((genre: { id: string; title: string }) => (
            <option key={genre.id} value={genre.id}>
              {genre.title.charAt(0).toUpperCase() + genre.title.slice(1)}
            </option>
          ))}
        </select>
        <select
          name="skillIds"
          id="skillIds"
          className="bg-light-grey p-4 rounded-lg border border-neutral-grey w-full"
          multiple
        >
          {skills.map((skill: { id: string; title: string }) => (
            <option key={skill.id} value={skill.id}>
              {skill.title.charAt(0).toUpperCase() + skill.title.slice(1)}
            </option>
          ))}
        </select>
        <Input type="text" name="role" id="role" placeholder="Role * (e.g. Violin)" required />
        <div className="flex items-center gap-2">
          <Input type="checkbox" name="paid" id="paid" /> Paid
        </div>
        <Input type="text" name="location" id="location" placeholder="Location (e.g. Copenhagen)" />
        <Button
          variant="primary"
          icon="plus"
          type="submit"
          text={isSubmitting ? "Creating..." : "+ Create"}
          disabled={isSubmitting}
          className={`bg-primary-yellow text-black w-fit py-2 px-4 rounded-lg ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        />
      </Form>
      {actionData?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <strong>Error:</strong> {actionData.error}
        </div>
      )}
    </div>
  );
}
