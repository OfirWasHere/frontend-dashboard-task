
export const GetAllDataFromFireStore = async (data: any) => {
    try {
        const result = await fetch('http://127.0.0.1:5001/fullstack-home-task/us-central1/getAllVisits', {
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
export const addDataToFireStore = async (data: any) => { }
export const removeDataFromFireStore = async (data: any) => { }
export const editDataFromFireStore = async (data: any) => { }
export const DeleteDataFromFireStore = async (data: any) => { }