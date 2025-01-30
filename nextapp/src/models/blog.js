import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

// Ensure the model is defined only once
let Blog;

try {
  // Check if the model is already registered in mongoose.models
  if (mongoose.models && mongoose.models.Blog) {
    Blog = mongoose.models.Blog;
  } else {
    // Register the model if not already defined
    Blog = mongoose.model('Blog', blogSchema);
  }
} catch (error) {
  console.error("Error while checking or defining Blog model: ", error);
  throw error;
}

export default Blog;
