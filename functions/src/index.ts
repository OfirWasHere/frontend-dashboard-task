import AppConfig from "./config/app-config";
import { Visit } from "./utils/types";
import { onRequest } from "firebase-functions/https";

const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const cors = require("cors")({ origin: '*' });

initializeApp();
const db = getFirestore();

// GET
export const getAllVisits = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const fetched = await db.collection(AppConfig.databaseName).get();
            const data = fetched.docs.map((e: any) => ({ id: e.id, ...e.data() }));
            res.status(200).json(data);
        } catch (error) {
            console.error("Error fetching documents:", error);
            res.status(500).send("Error fetching data");
        }
    });
});

// POST
export const addVisits = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const payload: Visit = req.body.payload;
            if (!payload) {
                res.status(400).send("Missing payload");
                return;
            }
            await db.collection(AppConfig.databaseName).add(payload);
            res.status(200).send("Visit added successfully");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error adding data");
        }
    });
});

// DELETE
export const removeVisits = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const payload: string = req.body.id;
            if (!payload) {
                res.status(400).send("Missing ID");
                return;
            }
            await db.collection(AppConfig.databaseName).doc(payload).delete();
            res.status(200).send("Visit deleted successfully");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error deleting data");
        }
    });
});

// PUT
export const editVisits = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const payload: Visit = req.body.payload;
            if (!payload) {
                res.status(400).send("Missing details");
                return;
            }
            await db
                .collection(AppConfig.databaseName)
                .doc(payload.id)
                .update({ date: payload.date, visits: payload.visits });
            res.status(200).send("Visit updated successfully");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error updating data");
        }
    });
});

