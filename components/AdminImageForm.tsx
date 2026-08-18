"use client";

import { useState } from "react";
import { Upload, Image as ImageIcon, CheckCircle2 } from "lucide-react";

interface Props {
  onSuccess: () => void;
}

export default function AdminImageForm({ onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Makeover");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0] || null;

    setFile(selectedFile);
    setMessage("");

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !title.trim()) {
      setMessage("Please enter a title and choose an image.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    try {
      const res = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Image uploaded successfully!");

        setTitle("");
        setDescription("");
        setCategory("Makeover");
        setFile(null);
        setPreview(null);

        onSuccess();
      } else {
        setMessage(data?.error || "Upload failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        p-6 md:p-8
        rounded-3xl
        shadow-[0_15px_50px_rgba(100,60,70,0.12)]
        border border-[#f0dfe3]
        space-y-6
      "
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#3a272c]">
          Add New Image
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Add a new makeover image to your gallery.
        </p>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#4a343a]">
          Image Title
        </label>

        <input
          type="text"
          placeholder="Enter image title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full
            px-4
            py-3
            border
            border-[#e6cfd4]
            rounded-xl
            bg-[#fffafa]
            text-[#3a272c]
            outline-none
            transition-all
            duration-300
            focus:border-[#c98992]
            focus:ring-4
            focus:ring-[#c98992]/10
          "
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#4a343a]">
          Description
          <span className="text-gray-400 font-normal">
            {" "}
            (Optional)
          </span>
        </label>

        <textarea
          placeholder="Write a short description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="
            w-full
            px-4
            py-3
            border
            border-[#e6cfd4]
            rounded-xl
            bg-[#fffafa]
            text-[#3a272c]
            outline-none
            resize-none
            transition-all
            duration-300
            focus:border-[#c98992]
            focus:ring-4
            focus:ring-[#c98992]/10
          "
          rows={3}
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#4a343a]">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            w-full
            px-4
            py-3
            border
            border-[#e6cfd4]
            rounded-xl
            bg-[#fffafa]
            text-[#3a272c]
            outline-none
            cursor-pointer
            transition-all
            duration-300
            focus:border-[#c98992]
            focus:ring-4
            focus:ring-[#c98992]/10
          "
        >
          <option value="Makeover">Makeover</option>
          <option value="Party">Jewels</option>
          <option value="Hair">Mehndi Design</option>
          
        </select>
      </div>

      {/* Image Upload */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[#4a343a]">
          Choose Image
        </label>

        <label
          htmlFor="image-upload"
          className="
            relative
            flex
            flex-col
            items-center
            justify-center
            w-full
            min-h-[220px]
            px-6
            py-8
            border-2
            border-dashed
            border-[#d4a5a5]
            rounded-2xl
            bg-gradient-to-br
            from-[#fffafa]
            to-[#fdf1f3]
            cursor-pointer
            overflow-hidden
            transition-all
            duration-300
            hover:border-[#c98992]
            hover:bg-[#f9e9ec]
          "
        >
          {preview ? (
            <>
              {/* Preview */}
              <img
                src={preview}
                alt="Selected preview"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                "
              />

              {/* Preview Overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-black/45
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-white
                "
              >
                <CheckCircle2
                  size={42}
                  className="mb-3"
                />

                <p className="font-semibold text-base">
                  Image Selected
                </p>

                <p className="text-sm text-white/80 mt-1">
                  Click to choose another image
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Upload Icon */}
              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-[#f3d9de]
                  flex
                  items-center
                  justify-center
                  text-[#a75d6c]
                  mb-4
                "
              >
                <Upload size={28} />
              </div>

              <p className="text-base font-semibold text-[#4a343a]">
                Choose an image
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Click here to browse your images
              </p>

              <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                <ImageIcon size={15} />
                <span>JPG, JPEG, PNG, WEBP</span>
              </div>
            </>
          )}

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            required={!file}
          />
        </label>

        {/* Selected File Name */}
        {file && (
          <div
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              bg-[#fdf1f3]
              border
              border-[#efd5da]
            "
          >
            <div
              className="
                w-9
                h-9
                rounded-lg
                bg-[#e8b4b8]
                flex
                items-center
                justify-center
                text-white
                shrink-0
              "
            >
              <ImageIcon size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-[#4a343a] truncate">
                {file.name}
              </p>

              <p className="text-xs text-gray-500 mt-0.5">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          py-3.5
          rounded-xl
          bg-gradient-to-r
          from-[#d4a5a5]
          to-[#c27f8b]
          text-white
          font-semibold
          shadow-[0_8px_25px_rgba(194,127,139,0.25)]
          hover:shadow-[0_10px_30px_rgba(194,127,139,0.4)]
          hover:-translate-y-0.5
          transition-all
          duration-300
          disabled:opacity-60
          disabled:cursor-not-allowed
          disabled:hover:translate-y-0
        "
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      {/* Message */}
      {message && (
        <div
          className={`
            text-sm
            text-center
            px-4
            py-3
            rounded-xl
            ${
              message.includes("successfully")
                ? "bg-green-50 text-green-600 border border-green-100"
                : "bg-red-50 text-red-600 border border-red-100"
            }
          `}
        >
          {message}
        </div>
      )}
    </form>
  );
}