import { useState } from "react";
import { apiFetch } from "~/lib/apiFetch";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  currentUrl?: string;
}

export default function ImageUpload({ onUploadComplete, currentUrl }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);

    // Upload file
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await apiFetch("/uploadthing", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      onUploadComplete(data.file.url);
    } catch (error) {
      console.error("Upload failed:", error);
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      {previewUrl ? (
        <div className="relative">
          <img src={previewUrl} alt="Preview" className="max-h-48 w-full object-cover rounded-lg" />
          <button
            type="button"
            onClick={() => {
              setPreviewUrl(null);
              onUploadComplete("");
            }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
          <div className="text-center">
            <p className="text-sm text-gray-600">{isUploading ? "Uploading..." : "Click to upload image"}</p>
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={isUploading} />
        </label>
      )}
    </div>
  );
}
