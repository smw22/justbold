import Input from "~/components/Input";
import { Form } from "react-router";
import Button from "~/components/Button";
import ImageUpload from "~/components/ImageUpload";
import { useState } from "react";

export default function CreateServiceForm({ categories, isSubmitting }: { categories: string[]; isSubmitting: boolean }) {
  const [mediaUrl, setMediaUrl] = useState("");

  const formatCategory = (category: string) =>
    category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <Form method="post" className="flex flex-col gap-4">
      <Input type="text" name="title" id="title" placeholder="Title" required />
      <ImageUpload onUploadComplete={setMediaUrl} currentUrl={mediaUrl} />
      <input type="hidden" name="media" value={mediaUrl} />
      <select
        name="category"
        id="category"
        className="p-2.5 bg-light-grey outline-black/30 focus:outline-primary-yellow rounded-lg outline-1"
        required
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {formatCategory(category)}
          </option>
        ))}
      </select>
      <Input textarea name="content" id="content" placeholder="Description" required />
      <Input type="number" name="price" id="price" placeholder="Price" required />
      <Input type="text" name="location" id="location" placeholder="Location" required />
      <Button
        variant="primary"
        icon="Plus"
        type="submit"
        text={isSubmitting ? "Posting..." : "Post "}
        disabled={isSubmitting}
        className={`self-end ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      />
    </Form>
  );
}
