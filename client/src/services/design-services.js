import {fetchWithAuth} from "./base-services";


export async function getUserDesigns() {
    return fetchWithAuth('v1/designs' ,{
        method: 'GET',
    });
}

export async function getUserDesignByID(designId) {
    return fetchWithAuth(`v1/designs/${designId}` ,{
        method: 'GET',
    });
}

export async function saveDesign(designData ,designId) {
    return fetchWithAuth(`v1/designs` ,{
        method: 'POST',
        body:{
            ...designData,
            designId,
        }
    });
}

export async function deleteDesign(designId) {
    return fetchWithAuth(`v1/designs/${designId}` ,{
        method: 'DELETE',
    });
}