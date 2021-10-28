const Card = require("../models/card");
const slugify = require("slugify");

// ES7: async-await
exports.create = async (req, res) => {
  try {
    const { number } = req.body;
    res.json(await new Card({ number, slug: slugify(number) }).save());
  } catch (err) {
    console.log("CARD CREATION ERR ---->", err);
    res.status(400).send("Card creation failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Card.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  let card = await Card.findOne({ slug: req.params.slug }).exec();
  res.json(card);
};

// exports.read = async (req, res) => {
//   let deck = await Deck.findOne({ slug: req.params.slug }).exec();
//   const cards = await Card.find({ parent: deck })
//     .populate("card")
//     .exec();

//   res.json({
//     deck,
//     cards,
//   });
// };

exports.update = async (req, res) => {
  const { number } = req.body;
  try {
    const updated = await Card.findOneAndUpdate(
      { slug: req.params.slug },
      { number, slug: slugify(number) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Card update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Card.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Card delete failed");
  }
};