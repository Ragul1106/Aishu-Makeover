"use client";

import { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";

interface ImageType {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
}

interface Props {
  images: ImageType[];
  onUpdate: () => void;
}

export default function AdminImageList({ images, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // Safety: make sure images is always an array
  const safeImages = Array.isArray(images) ? images : [];

  const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this image?")) return;

  try {
    const res = await fetch(`/api/imagess/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      onUpdate(); // refresh the list
    } else {
      alert(data.error || "Failed to delete image");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong while deleting");
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Manage Images ({safeImages.length})
      </h2>

      {safeImages.length === 0 ? (
        <p className="text-gray-500 py-8 text-center">No images uploaded yet.</p>
      ) : (
        <div className="grid gap-4">
          {safeImages.map((img) => (
            <div
              key={img._id}
              className="flex gap-4 bg-white p-4 rounded-xl shadow-sm items-center"
            >
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
                    <p className="text-sm text-gray-500">{img.category}</p>
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