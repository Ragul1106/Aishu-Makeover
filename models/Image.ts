import mongoose, { Schema, models } from "mongoose";

const ImageSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    category: { type: String, default: "Makeover" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Image || mongoose.model("Image", ImageSchema);