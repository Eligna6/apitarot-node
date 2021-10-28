const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    nameShort: String,
    type: {
      type: String,
      enum: ["major", "minor"],
    },
    number: Number,
    hebrewLetter: String,
    signification: String,
    colour: String,
    musicNote: String,
    gematria: Number,
    astrology: String,
    alchemy: String,
    description: String,
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: "Deck", required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Card", cardSchema);
