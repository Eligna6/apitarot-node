const Deck = require("../models/deck");
const Card = require("../models/card");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { nameShort } = req.body;

    res.json(await new Deck({ nameShort, slug: slugify(nameShort) }).save());
  } catch (err) {
    res.status(400).send("Deck creation failed");
  }
};

exports.list = async (req, res) =>
  res.json(await Deck.find({}).sort({ createdAt: -1 }).exec());

/*exports.read = async (req, res) => {
  let deck = await Deck.findOne({ slug: req.params.slug }).exec();
  res.json(deck);
};*/

exports.read = async (req, res) => {
  let deck = await Deck.findOne({ slug: req.params.slug }).exec();
  // res.json(deck);
  const cards = await Card.find({ deck }).populate("deck").exec();

  res.json({
    deck,
    cards,
  });
};

exports.update = async (req, res) => {
  const { nameShort } = req.body;
  try {
    const updated = await Deck.findOneAndUpdate(
      { slug: req.params.slug },
      { nameShort, slug: slugify(nameShort) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Deck update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Deck.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Deck deletion failed");
  }
};

exports.getCards = (req, res) => {
  Card.find({ parent: req.params._id }).exec((err, cards) => {
    if (err) console.log(err);
    res.json(cards);
  });
};