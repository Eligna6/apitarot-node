const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
    create,
    read,
    update,
    remove,
    list,
    getCards,
} = require("../controllers/deck");

// endpoints-routes
/**
 * @swagger
 * /api/deck:
 *   post:
 *     tags:
 *       - Deck
 *     description: Creates a new deck
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: deck
 *         description: Deck object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '../models/deck.js'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("/deck", authCheck, adminCheck, create);
/**
 * @swagger
 * /api/decks:
 *   get:
 *     tags:
 *       - Deck
 *     description: Returns all decks
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of decks
 *         schema:
 *           $ref: '../models/deck.js'
 */
router.get("/decks", list);
/**
 * @swagger
 * /api/deck/{id}:
 *   get:
 *     tags:
 *       - Deck
 *     description: Returns a single deck
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Deck's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single deck
 *         schema:
 *           $ref: '../models/deck.js'
 */
router.get("/deck/:slug", read);
/**
 * @swagger
 * /api/deck/{id}:
 *   put:
 *     tags: Deck
 *     description: Updates a single deck
 *     produces: application/json
 *     parameters:
 *       name: deck
 *       in: body
 *       description: Fields for the Deck resource
 *       schema:
 *         type: array
 *         $ref: '../models/deck.js'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("/deck/:slug", authCheck, adminCheck, update);
/**
 * @swagger
 * /api/deck/{id}:
 *   delete:
 *     tags:
 *       - Decks
 *     description: Deletes a single deck
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Deck's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("/deck/:slug", authCheck, adminCheck, remove);
/**
 * @swagger
 * /api/decks:
 *   get:
 *     tags:
 *       - Deck
 *     description: Returns all cards in a deck
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Deck's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of cards inside a deck
 *         schema:
 *           $ref: '../models/deck.js'
 */
router.get("/deck/cards/:_id", getCards);

module.exports = router;
