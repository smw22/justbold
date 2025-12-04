import { useState } from "react";
import { Link } from "react-router";
import ContextMenu from "~/components/ContextMenu";
import Button from "~/components/Button";
import Icon from "~/components/icon";
import Input from "~/components/Input";

export default function EditArray({
  array,
  editableText,
  selectOptions = [],
  placeholder,
  onChange,
}: {
  array: string[];
  editableText: boolean;
  selectOptions?: string[];
  placeholder: string;
  onChange: (e: string[]) => void;
}) {
  const [text, setText] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleAdd = () => {
    // First we make sure the input is long enough and that the string doesn't already exist in the array.
    if (text && text.length > 2 && !array.some((item) => item.toLowerCase() === text.toLowerCase())) {
      onChange([...array, text]);
      console.log("Jeg affyres!");
      setText("");
    }
  };

  const handleDelete = (deleteIndex: number) => {
    const newArray = array.filter((_, index) => index !== deleteIndex);
    onChange(newArray);
  };

  return (
    <section className="flex flex-col gap-4 w-full">
      {selectOptions.length > 0 ? (
        <div className="flex gap-4 w-full">
          <select
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border border-neutral-200 rounded-lg p-2"
          >
            <option value="" selected disabled>
              {placeholder}
            </option>
            {selectOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <Button icon="Plus" text="Add" variant="primary" onClick={handleAdd} />
        </div>
      ) : (
        <div className="flex gap-4 w-full">
          <Input
            variant="onboarding"
            placeholder=""
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1"
          />
          <Button icon="Plus" text="Add" variant="primary" onClick={handleAdd} />
        </div>
      )}
      <div className="flex flex-col gap-2 mt-2">
        {array.length === 0 ? (
          <p className="text-sm text-neutral-grey mx-2">None added yet.</p>
        ) : (
          array.map((str, index) =>
            editableText ? (
              <div key={index} className="flex items-center gap-2">
                <Input value={str} variant="onboarding" className="flex-1" />
                <Button icon="Trash" variant="secondary-glass" text="" onClick={() => handleDelete(index)} />
              </div>
            ) : (
              <div key={index} className="flex items-center gap-2">
                <p className={`inline-flex text-white bg-header-bg-1 capitalize px-3 py-1 rounded-full`}>{str}</p>
                <Button icon="Trash" variant="secondary-glass" text="" onClick={() => handleDelete(index)} />
              </div>
            )
          )
        )}
      </div>
    </section>
  );
}
