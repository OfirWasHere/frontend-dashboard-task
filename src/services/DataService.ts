import { VisitDataModal } from "../utils/types";

const API = "https://us-central1-fullstack-home-task.cloudfunctions.net/";

// GET
async function fetchAllVisits(): Promise<VisitDataModal[]> {
    try {
        const result = await fetch(API + 'getAllVisits', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        return data;
    } catch (error) {
        console.error('Error calling Firebase function:', error);
    }
}

// POST 
async function addVisits(payload: VisitDataModal) {
    try {
        await fetch(API + 'addVisits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ payload }),
        });
    } catch (error) {
        console.error('Error calling Firebase function:', error);
    }
}
// DELETE
async function deleteVisits(id: string) {
    try {
        await fetch(API + 'removeVisits', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
    } catch (error) {
        console.error('Error calling Firebase function:', error);
    }
}
// PUT 
async function editVisits(payload: VisitDataModal) {
    try {
        await fetch(API + 'editVisits', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload }),
        });
    } catch (error) {
        console.error('Error calling Firebase function:', error);
    }
}

export { fetchAllVisits, addVisits, deleteVisits, editVisits };