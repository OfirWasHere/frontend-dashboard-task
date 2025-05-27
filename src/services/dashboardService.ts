import { VisitDataModal } from "../utils/types";

const API = "http://127.0.0.1:5001/fullstack-home-task/us-central1/"

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
export const addVisit = async (payload: VisitDataModal) => {
    try {
        const result = await fetch(API + 'addVisit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload }),
        });
        console.log(result);

    } catch (error) {
        console.error('Error calling Firebase function:', error);
    }
}
export const removeDataFromFireStore = async (data: any) => { }
export const editDataFromFireStore = async (data: any) => { }
export const DeleteDataFromFireStore = async (data: any) => { }