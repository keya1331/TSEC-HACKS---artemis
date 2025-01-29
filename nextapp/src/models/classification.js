import mongoose from "mongoose";

const classificationSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "anonymous",
  },
  type: {
    type: String,
<<<<<<< HEAD
    enum: ["Flora", "Faunna"],
=======
    enum: [ "Flora", "Faunna"],
>>>>>>> 576fb3962f42ccfc65dab55794fe098dcf2276e2
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
<<<<<<< HEAD
  results: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
=======
>>>>>>> 576fb3962f42ccfc65dab55794fe098dcf2276e2
});

export default mongoose.models.Classification || mongoose.model("Classification", classificationSchema);
