import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  rangerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ranger',
    required: true,
  },
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;