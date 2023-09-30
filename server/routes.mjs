import express from "express";
import db from "./connection.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('SWAMISAMARTHA').status(200);
});

export default router;