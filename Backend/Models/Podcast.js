import mongoose from "mongoose";

const Schema = mongoose.Schema


const podcastSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['audio', 'video'],
    required: true
  },
  speaker: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  }
});

export default mongoose.model("Podcast", podcastSchema);
