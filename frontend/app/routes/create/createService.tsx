import AvatarHeader from "../services/components/AvatarHeader";
import CreateServiceForm from "./components/CreateServiceForm";

export async function clientAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const media = formData.get("media") as string;
  const tag = formData.get("tag") as string;
  const content = formData.get("content") as string;
  const price = formData.get("price") as string;
  const location = formData.get("location") as string;

  if (!title || !media || !content || !tag || !price || !location) {
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
        media,
        tag,
        content,
        price,
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

    return { success: true };
  } catch (error: any) {
    console.error("Network error: ", error.message);
  }
}

export default function CreateService() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <AvatarHeader imageSize={40} title="EchoLabs Studio" />
      <CreateServiceForm />
    </div>
  );
}
