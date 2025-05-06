import { fetchWithAuth } from "@/services/base-services";

export async function getUserDesigns() {
    return fetchWithAuth("/v1/designs");
}

export async function getUserDesignByID(designId) {
    return fetchWithAuth(`/v1/designs/${designId}`);
}

export async function saveDesign(designData, designId = null) {
    return fetchWithAuth(`/v1/designs`, {
        method: "POST",
        body: {
            ...designData,
            designId,
        },
    });
}

export async function deleteDesign(designId) {
    return fetchWithAuth(`/v1/designs/${designId}`, {
        method: "DELETE",
    });
}


