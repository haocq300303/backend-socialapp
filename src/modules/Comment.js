import mongoose from "mongoose";

const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    idPost: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    replies: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
