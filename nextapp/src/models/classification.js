import mongoose from "mongoose";

const classificationSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "anonymous",
  },
  type: {
    type: String,
    enum: [ "Flora", "Faunna"],
    required: true,
  },
  image: {
    type: String, // Local image path
    required: true,
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
});

export default mongoose.models.Classification || mongoose.model("Classification", classificationSchema);
