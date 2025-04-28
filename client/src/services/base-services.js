import { getSession } from "next-auth/react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchWithAuth(endpoint, options = {}) {
    const session = await getSession();

    if (!session) {
        throw new Error('Not authenticated!');
    }

    if (!session.idToken) {
        throw new Error('No token found in session!');
    }

    try {
        const config = {
            method: options.method || 'GET',
            headers: {
                Authorization: `Bearer ${session.idToken}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
            data: options.body,
            params: options.params,
        };

        // Ensure endpoint starts with a forward slash
        const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const url = `${API_URL}${formattedEndpoint}`;
        
        console.log('Making request to:', url);
        console.log('With headers:', config.headers);

        const response = await axios.request(url, config);
        return response.data;
    } catch (err) {
        console.error('API Request Error:', {
            message: err.message,
            response: err.response?.data,
            status: err.response?.status,
        });
        throw new Error(err.response?.data?.message || 'API request failed!');
    }
}