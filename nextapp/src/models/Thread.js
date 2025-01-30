import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "anonymous",
  },
  type: {
    type: String,
    enum: [ "Flora", "Faunna","Wildfire"],
    required: true,
  },
  image: {
    type: String, // Local image path
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
});

export default mongoose.models.Thread || mongoose.model("Thread", threadSchema);
