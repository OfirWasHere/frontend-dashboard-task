import { onRequest } from "firebase-functions/v2/https";
import { Visit } from "./utils/types";
import AppConfig from "./utils/app-config";
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

export const getAllVisits = onRequest(async (request, response) => {
    try {
        const fetched = await db.collection(AppConfig.databaseName).get();
        const data = fetched.docs.map((e: Visit) => ({ ...e.data() }));
        response.json(data[0]);
    } catch (error) {
        console.error("Error fetching documents:", error);
        response.status(500).send("Error fetching data");
    }
});