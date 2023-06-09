import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title: String,
  where: String,
  best_time: String,
  how_to_reach: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
  location: String,
  approved: {
    type: Boolean,
    default: true,
  },
});

const TourModal = mongoose.model("tour", tourSchema);

export default TourModal;
