import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("categories", postSchema);

export default Post;
