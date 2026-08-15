"use client";

import { useState } from "react";
import {
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Save,
  X,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

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

export default function AdminImageList({
  images,
  onUpdate,
}: Props) {
  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editTitle, setEditTitle] =
    useState("");

  const [editDesc, setEditDesc] =
    useState("");

  const [savingId, setSavingId] =
    useState<string | null>(null);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [movingId, setMovingId] =
    useState<string | null>(null);

  /* =====================================================
     SAFE + SORTED IMAGES
     ===================================================== */

  const safeImages: ImageType[] =
    Array.isArray(images)
      ? [...images].sort(
          (a, b) =>
            (a.order ?? 0) -
            (b.order ?? 0)
        )
      : [];

  /* =====================================================
     DELETE
     ===================================================== */

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const res = await fetch(
        `/api/images/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to delete image"
        );
      }

      onUpdate();
    } catch (error) {
      console.error(
        "Delete error:",
        error
      );

      alert(
        "Failed to delete the image."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =====================================================
     START EDIT
     ===================================================== */

  const startEdit = (
    img: ImageType
  ) => {
    setEditingId(img._id);
    setEditTitle(img.title);
    setEditDesc(
      img.description || ""
    );
  };

  /* =====================================================
     CANCEL EDIT
     ===================================================== */

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDesc("");
  };

  /* =====================================================
     SAVE EDIT
     ===================================================== */

  const saveEdit = async (
    id: string
  ) => {
    if (!editTitle.trim()) {
      alert("Title is required.");
      return;
    }

    try {
      setSavingId(id);

      const res = await fetch(
        `/api/images/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title: editTitle.trim(),
            description:
              editDesc.trim(),
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to update image"
        );
      }

      cancelEdit();
      onUpdate();
    } catch (error) {
      console.error(
        "Edit error:",
        error
      );

      alert(
        "Failed to update the image."
      );
    } finally {
      setSavingId(null);
    }
  };

  /* =====================================================
     MOVE IMAGE
     ===================================================== */

  const moveImage = async (
    index: number,
    direction: "up" | "down"
  ) => {
    const targetIndex =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= safeImages.length
    ) {
      return;
    }

    const newImages = [
      ...safeImages,
    ];

    const currentImage =
      newImages[index];

    const targetImage =
      newImages[targetIndex];

    newImages[index] =
      targetImage;

    newImages[targetIndex] =
      currentImage;

    try {
      setMovingId(
        currentImage._id
      );

      await Promise.all(
        newImages.map(
          (img, i) =>
            fetch(
              `/api/images/${img._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  order: i,
                }),
              }
            )
        )
      );

      onUpdate();
    } catch (error) {
      console.error(
        "Order update error:",
        error
      );

      alert(
        "Failed to change image order."
      );
    } finally {
      setMovingId(null);
    }
  };

  /* =====================================================
     UI
     ===================================================== */

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
        "
      >
        <div>
          <h2 className="text-2xl font-bold text-[#3a272c]">
            Manage Images
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {safeImages.length}{" "}
            {safeImages.length === 1
              ? "image"
              : "images"}{" "}
            uploaded
          </p>
        </div>

        <div
          className="
            inline-flex
            items-center
            gap-2
            w-fit
            px-4
            py-2
            rounded-full
            bg-[#fdf0f3]
            border
            border-[#efd4da]
            text-[#9b596a]
            text-sm
            font-semibold
          "
        >
          <ImageIcon size={16} />

          {safeImages.length} Images
        </div>
      </div>

      {/* INFO */}

      {safeImages.length > 0 && (
        <div
          className="
            rounded-2xl
            border
            border-[#efdce0]
            bg-[#fffafb]
            px-4
            py-3
            text-sm
            text-[#806a70]
          "
        >
          Use the{" "}
          <strong className="text-[#9b596a]">
            ↑
          </strong>{" "}
          and{" "}
          <strong className="text-[#9b596a]">
            ↓
          </strong>{" "}
          buttons to change the gallery order.
        </div>
      )}

      {/* EMPTY */}

      {safeImages.length === 0 ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            py-16
            px-6
            rounded-3xl
            border-2
            border-dashed
            border-[#e5cbd1]
            bg-gradient-to-br
            from-[#fffafb]
            to-[#fdf1f3]
            text-center
          "
        >
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
            <ImageIcon size={30} />
          </div>

          <h3 className="text-lg font-semibold text-[#4a343a]">
            No Images Found
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Upload your first makeover image.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {safeImages.map(
            (img, index) => (
              <div
                key={img._id}
                className="
                  group
                  bg-white
                  border
                  border-[#eee0e3]
                  rounded-2xl
                  p-4
                  shadow-[0_8px_30px_rgba(100,60,70,0.07)]
                  hover:shadow-[0_12px_35px_rgba(100,60,70,0.12)]
                  transition-all
                  duration-300
                "
              >

                <div className="flex flex-col md:flex-row gap-4">

                  {/* ORDER */}

                  <div
                    className="
                      flex
                      md:flex-col
                      items-center
                      justify-center
                      gap-2
                      md:w-10
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        moveImage(
                          index,
                          "up"
                        )
                      }
                      disabled={
                        index === 0 ||
                        movingId !== null
                      }
                      className="
                        w-9
                        h-9
                        rounded-lg
                        border
                        border-[#ead6da]
                        bg-[#fffafb]
                        text-[#80505f]
                        flex
                        items-center
                        justify-center
                        hover:bg-[#f4dce1]
                        disabled:opacity-30
                      "
                    >
                      <ArrowUp size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        moveImage(
                          index,
                          "down"
                        )
                      }
                      disabled={
                        index ===
                          safeImages.length -
                            1 ||
                        movingId !== null
                      }
                      className="
                        w-9
                        h-9
                        rounded-lg
                        border
                        border-[#ead6da]
                        bg-[#fffafb]
                        text-[#80505f]
                        flex
                        items-center
                        justify-center
                        hover:bg-[#f4dce1]
                        disabled:opacity-30
                      "
                    >
                      <ArrowDown
                        size={17}
                      />
                    </button>
                  </div>

                  {/* IMAGE */}

                  <div className="relative shrink-0">

                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      className="
                        w-full
                        md:w-28
                        h-52
                        md:h-28
                        object-cover
                        rounded-xl
                        border
                        border-[#ead6da]
                      "
                    />

                    <span
                      className="
                        absolute
                        top-2
                        left-2
                        min-w-7
                        h-7
                        px-2
                        rounded-full
                        bg-black/65
                        text-white
                        text-xs
                        font-semibold
                        flex
                        items-center
                        justify-center
                      "
                    >
                      #{index + 1}
                    </span>

                  </div>

                  {/* CONTENT */}

                  <div className="flex-1 min-w-0">

                    {editingId ===
                    img._id ? (
                      <div className="space-y-3">

                        <input
                          value={
                            editTitle
                          }
                          onChange={(e) =>
                            setEditTitle(
                              e.target.value
                            )
                          }
                          className="
                            w-full
                            px-4
                            py-2.5
                            border
                            border-[#dfc3c9]
                            rounded-xl
                            outline-none
                            focus:border-[#c98992]
                          "
                          placeholder="Title"
                        />

                        <textarea
                          value={
                            editDesc
                          }
                          onChange={(e) =>
                            setEditDesc(
                              e.target.value
                            )
                          }
                          rows={2}
                          className="
                            w-full
                            px-4
                            py-2.5
                            border
                            border-[#dfc3c9]
                            rounded-xl
                            outline-none
                            resize-none
                            focus:border-[#c98992]
                          "
                          placeholder="Description"
                        />

                        <div className="flex gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              saveEdit(
                                img._id
                              )
                            }
                            disabled={
                              savingId ===
                              img._id
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-4
                              py-2
                              rounded-xl
                              bg-[#9b596a]
                              text-white
                              text-sm
                              hover:bg-[#814657]
                              disabled:opacity-50
                            "
                          >
                            {savingId ===
                            img._id ? (
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <Save
                                size={16}
                              />
                            )}

                            {savingId ===
                            img._id
                              ? "Saving..."
                              : "Save"}
                          </button>

                          <button
                            type="button"
                            onClick={
                              cancelEdit
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-4
                              py-2
                              rounded-xl
                              bg-gray-100
                              text-gray-700
                              text-sm
                              hover:bg-gray-200
                            "
                          >
                            <X size={16} />
                            Cancel
                          </button>

                        </div>
                      </div>
                    ) : (
                      <div>

                        <h3 className="text-lg font-semibold text-[#3a272c]">
                          {img.title}
                        </h3>

                        {img.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {
                              img.description
                            }
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2 mt-3">

                          <span
                            className="
                              px-2.5
                              py-1
                              rounded-full
                              bg-[#fdf0f3]
                              text-[#9b596a]
                              text-xs
                              font-medium
                            "
                          >
                            {img.category ||
                              "Makeover"}
                          </span>

                          <span className="text-xs text-gray-400 py-1">
                            Order:{" "}
                            {img.order ??
                              index}
                          </span>

                        </div>

                        {/* ACTIONS */}

                        <div className="flex gap-2 mt-4">

                          <button
                            type="button"
                            onClick={() =>
                              startEdit(
                                img
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-4
                              py-2
                              rounded-xl
                              bg-[#fdf1f3]
                              text-[#8d4d5d]
                              text-sm
                              font-medium
                              hover:bg-[#f4dce1]
                            "
                          >
                            <Edit2
                              size={16}
                            />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                img._id
                              )
                            }
                            disabled={
                              deletingId ===
                              img._id
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-4
                              py-2
                              rounded-xl
                              bg-red-50
                              text-red-500
                              text-sm
                              font-medium
                              hover:bg-red-100
                              disabled:opacity-50
                            "
                          >
                            {deletingId ===
                            img._id ? (
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2
                                size={16}
                              />
                            )}

                            {deletingId ===
                            img._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            )
          )}

        </div>
      )}
    </div>
  );
}