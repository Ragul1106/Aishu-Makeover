"use client";

import { useState } from "react";

interface Props {
  onSuccess: () => void;
}

export default function AdminImageForm({ onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Makeover");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

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

      if (res.ok) {
        setMessage("Image uploaded successfully!");
        setTitle("");
        setDescription("");
        setFile(null);
        onSuccess();
      } else {
        setMessage("Upload failed");
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-2">Add New Image</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2.5 border rounded-xl"
        required
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2.5 border rounded-xl"
        rows={2}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-2.5 border rounded-xl"
      >
        <option>Makeover</option>
        <option>Bridal</option>
        <option>Party</option>
        <option>Hair</option>
        <option>Skin</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#d4a5a5] text-white rounded-xl hover:bg-[#c99494] transition disabled:opacity-60"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      {message && <p className="text-sm text-center text-green-600">{message}</p>}
    </form>
  );
}