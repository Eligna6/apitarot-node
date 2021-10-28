const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: String,
    role: {
      type: String,
      default: "subscriber",
    },
    favoriteCards: {
      type: Array,
      default: [],
    },
    // whishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
