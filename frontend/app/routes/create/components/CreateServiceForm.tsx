import Input from "~/components/Input";
import { Form } from "react-router";
import Button from "~/components/Button";

export default function CreateServiceForm({ categories, isSubmitting }: { categories: string[]; isSubmitting: boolean }) {
  const formatCategory = (category: string) =>
    category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <Form method="post" className="flex flex-col gap-4">
      <Input type="text" name="title" id="title" placeholder="Title" required />
      {/* NOTE: We need a imageUploader component here or placeholder images with a select input */}
      <Input type="text" name="media" id="media" placeholder="Media" />
      <select
        name="category"
        id="category"
        className="bg-light-grey p-2.5 rounded-lg border border-neutral-grey w-full"
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
        icon="plus"
        type="submit"
        text={isSubmitting ? "Creating..." : "+ Create"}
        disabled={isSubmitting}
        className={`bg-primary-yellow text-black w-fit py-2 px-4 rounded-lg ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      />
    </Form>
  );
}
