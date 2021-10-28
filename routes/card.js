const express = require("express");
const router = express.Router();

// middlewares - validations
const { authCheck, adminCheck } = require("../middlewares/auth");

// middlewares - controller (final logic)
const { create, read, update, remove, list } = require("../controllers/card");

// routes - endpoints
/**
 * @swagger
 * /api/card:
 *   post:
 *     tags:
 *       - Card
 *     description: Creates a new card
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: card
 *         description: Card object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '../models/card.js'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post("/card", authCheck, adminCheck, create);
/**
 * @swagger
 * /api/cards:
 *   get:
 *     tags:
 *       - Card
 *     description: Returns all cards
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of cards
 *         schema:
 *           $ref: '../models/card.js'
 */
router.get("/cards", list);
/**
 * @swagger
 * /api/card/{id}:
 *   get:
 *     tags:
 *       - Card
 *     description: Returns a single card
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Card's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single card
 *         schema:
 *           $ref: '../models/card.js'
 */
router.get("/card/:slug", read);
/**
 * @swagger
 * /api/card/{id}:
 *   put:
 *     tags: Card
 *     description: Updates a single card
 *     produces: application/json
 *     parameters:
 *       name: card
 *       in: body
 *       description: Fields for the Card resource
 *       schema:
 *         type: array
 *         $ref: '../models/card.js'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put("/card/:slug", authCheck, adminCheck, update);
/**
 * @swagger
 * /api/card/{id}:
 *   delete:
 *     tags:
 *       - Cards
 *     description: Deletes a single card
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Card's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete("/card/:slug", authCheck, adminCheck, remove);

module.exports = router;
