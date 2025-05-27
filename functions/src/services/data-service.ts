// import { onRequest } from "firebase-functions/https";
// import { Visit } from "../utils/types";
// import AppConfig from "../utils/app-config";
// const { getFirestore } = require('firebase-admin/firestore');


// const db = getFirestore();

// export const getAllVisits = onRequest({ cors: true }, async (request, response) => {
//     try {
//         const fetched = await db.collection(AppConfig.databaseName).get();
//         const data = fetched.docs.map((e: Visit) => ({ ...e.data() }));
//         response.json(data[0]);
//     } catch (error) {
//         console.error("Error fetching documents:", error);
//         response.status(500).send("Error fetching data");
//     }
// });