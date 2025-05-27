import AppConfig from "./config/app-config";
import { Visit } from "./utils/types";
import { onRequest } from "firebase-functions/https";

const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

// GET
export const getAllVisits = onRequest(async (request, response) => {
    try {
        const fetched = await db.collection(AppConfig.databaseName).get();
        const data = fetched.docs.map((e: Visit) => ({ id: e.id, ...e.data() }));
        response.json(data || {});
        response.status(200).send("Data fetched successfully");
    } catch (error) {
        console.error("Error fetching documents:", error);
        response.status(500).send("Error fetching data");
    }
});

// POST
export const addVisits = onRequest(async (request, response) => {
    try {
        const payload: Visit = request.body.payload
        if (!payload) {
            response.status(400).send("Missing payload");
            return;
        }
        await db.collection(AppConfig.databaseName).add(payload);
        response.status(200).send("Visit added successfully");
    } catch (error) {
        console.error(error);
        response.status(500).send("Error adding data");
    }
});

// DELETE
export const removeVisits = onRequest(async (request, response) => {
    try {
        const payload: string = request.body.id;
        if (!payload) {
            response.status(400).send("Missing ID");
            return;
        }
        await db.collection(AppConfig.databaseName).doc(payload).delete()
        response.status(200).send("Visit deleted successfully");
    } catch (error) {
        console.error(error);
        response.status(500).send("Error deleting data");
    }
})

// PUT
export const editVisits = onRequest(async (request, response) => {
    try {
        const payload: Visit = request.body.payload;

        if (!payload) {
            response.status(400).send("Missing details");
            return;
        }
        await db.collection(AppConfig.databaseName).doc(payload.id).update({ date: payload.date, visits: payload.visits });
        response.status(200).send("Visit updated successfully");
    } catch (error) {
        console.error(error);
        response.status(500).send("Error updating data");
    }
})