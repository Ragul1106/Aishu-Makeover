"use client";

import { useState } from "react";
import { Trash2, Edit2, ArrowUp, ArrowDown } from "lucide-react";

interface ImageType {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  order?: number;
}

interface Props {
  images: ImageType[];
  onUpdate: () => void;
}

export default function AdminImageList({ images, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const safeImages = Array.isArray(images) ? [...images].sort((a, b) => (a.order || 0) - (b.order || 0)) : [];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/images/${id}`, { method: "DELETE" });
      if (res.ok) onUpdate();
      else alert("Failed to delete");
    } catch {
      alert("Something went wrong");
    }
  };

  const startEdit = (img: ImageType) => {
    setEditingId(img._id);
    setEditTitle(img.title);
    setEditDesc(img.description || "");
  };

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/images/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, description: editDesc }),
    });

    if (res.ok) {
      setEditingId(null);
      onUpdate();
    }
  };

  // Change order
  const moveImage = async (index: number, direction: "up" | "down") => {
  const newImages = [...safeImages];
  const targetIndex = direction === "up" ? index - 1 : index + 1;

  if (targetIndex < 0 || targetIndex >= newImages.length) return;

  // Swap the two images in the array
  const temp = newImages[index];
  newImages[index] = newImages[targetIndex];
  newImages[targetIndex] = temp;

  // Re-assign clean order numbers (0, 1, 2, 3...)
  try {
    await Promise.all(
      newImages.map((img, i) =>
        fetch(`/api/images/${img._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: i }),
        })
      )
    );

    onUpdate(); // Refresh the list
  } catch (error) {
    console.error("Failed to update order:", error);
    alert("Failed to change order");
  }
};

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Manage Images ({safeImages.length})
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Use ↑ ↓ buttons to change the order. Top image will show first on the website.
      </p>

      {safeImages.length === 0 ? (
        <p className="text-gray-500 py-8 text-center">No images uploaded yet.</p>
      ) : (
        <div className="grid gap-4">
          {safeImages.map((img, index) => (
            <div
              key={img._id}
              className="flex gap-4 bg-white p-4 rounded-xl shadow-sm items-center"
            >
              {/* Order buttons */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveImage(index, "up")}
                  disabled={index === 0}
                  className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  onClick={() => moveImage(index, "down")}
                  disabled={index === safeImages.length - 1}
                  className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown size={16} />
                </button>
              </div>

              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1">
                {editingId === img._id ? (
                  <div className="space-y-2">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-lg"
                    />
                    <input
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="w-full px-3 py-1.5 border rounded-lg"
                      placeholder="Description"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(img._id)}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-200 text-sm rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-medium">{img.title}</h3>
                    <p className="text-sm text-gray-500">
                      {img.category} • Order: {img.order ?? index}
                    </p>
                  </>
                )}
              </div>

              {editingId !== img._id && (
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(img)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="p-2 hover:bg-red-50 text-red-500 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}