import { Form } from "react-router";

export default function CreateServiceForm({
  tags,
  isSubmitting,
}: {
  tags: Array<{ id: string; title: string }>;
  isSubmitting: boolean;
}) {
  const inputStyle = "bg-light-grey p-4 rounded-lg border border-neutral-grey w-full";

  return (
    <Form method="post" className="flex flex-col gap-4">
      <p className="flex flex-col gap-2">
        <label htmlFor="title">Title *</label>
        <input type="text" name="title" id="title" placeholder="Studio Session" className={inputStyle} required />
      </p>

      {/*NOTE: We need a imageUploader component here or placeholder images with a select input */}
      <p className="flex flex-col gap-2">
        <label htmlFor="media">Media (optional)</label>
        <input
          type="text"
          name="media"
          id="media"
          placeholder="https://ipsumimages.randomimage.com/jqfnognjobgqoe"
          className={inputStyle}
        />
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
        <label htmlFor="content">Description *</label>
        <textarea name="content" id="content" placeholder="Write your description here..." className={inputStyle} required />
      </p>

      <p className="flex flex-col gap-2">
        <label htmlFor="price">Price *</label>
        <input type="number" name="price" id="price" placeholder="100" className={inputStyle} required />
      </p>

      <p className="flex flex-col gap-2">
        <label htmlFor="location">Location *</label>
        <input type="text" name="location" id="location" placeholder="Odense" className={inputStyle} required />
      </p>

      {/* NOTE: had to use normal button because of missing type prop in button component, maybe fix in future */}
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
  );
}
