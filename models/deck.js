const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const deckSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nameShort: {
      type: String,
      required: true,
    },
    description: String,
    cardQuantity: Number,
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    cards: [
      {
        type: ObjectId,
        ref: "Card",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deck", deckSchema);
