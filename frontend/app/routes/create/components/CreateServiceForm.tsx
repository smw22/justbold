import { Form } from "react-router";

export default function CreateServiceForm() {
  const inputStyle = "bg-light-grey p-4 rounded-lg border border-neutral-grey";

  return (
    <Form className="flex flex-col gap-4">
      <p className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Studio Session"
          className={inputStyle}
        />
      </p>

      {/*NOTE: We need a imageUploader component here or placeholder images with a select input */}
      <p className="flex flex-col gap-2">
        <label htmlFor="media">Media</label>
        <input
          type="text"
          name="media"
          id="media"
          placeholder="https://ipsumimages.randomimage.com/jqfnognjobgqoe"
          className={inputStyle}
        />
      </p>

      <p className="flex flex-col gap-2">
        <label htmlFor="tag">Choose a tag</label>
        <select name="tag" id="tag" className={inputStyle}>
          {/*NOTE: In the future we have to map the multiple possible tags from the tag table */}
          <option value="art">Art</option>
          <option value="recording">Recording</option>
          <option value="studio">Studio</option>
        </select>
      </p>

      <p className="flex flex-col gap-2">
        <label htmlFor="content">Description</label>
        <textarea
          name="content"
          id="content"
          placeholder="Write your description here..."
          className={inputStyle}
        />
      </p>

      <p className="flex flex-col gap-2">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="100"
          className={inputStyle}
        />
      </p>

      <p className="flex flex-col gap-2">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Odense"
          className={inputStyle}
        />
      </p>

      {/* NOTE: had to use normal button because of missing type prop in button component, maybe fix in future */}
      <button
        type="submit"
        className="bg-primary-yellow text-black w-fit py-2 px-4 rounded-lg"
      >
        + Create
      </button>
    </Form>
  );
}
