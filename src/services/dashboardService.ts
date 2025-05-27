import { VisitDataModal } from "../utils/types";

const API = "http://127.0.0.1:5001/fullstack-home-task/us-central1/"

// GET
export const fetchAllVisits = async () => {
    try {
        const result = await fetch(API + 'getAllVisits', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json();
        console.log(data);
    } catch (error) {
        console.error('Error calling Firebase function:', error);
    }
}

// POST 
export const addVisits = async (payload: VisitDataModal) => {
    console.log(payload);

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
export const deleteVisits = async (id: string) => {
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
export const editVisits = async (payload: VisitDataModal) => {
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