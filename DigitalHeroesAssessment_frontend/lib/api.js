import { get } from "http";
import { de } from "zod/locales";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"
export async function getFormValue(formData){
    console.log("Got value from frontend"+formData.name);
    try {
        const response = await fetch(
            `${baseUrl}/api/submit`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        )

        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

export async function getClients(statusName) {
    try {
        const response = await fetch(
            `${baseUrl}/api/ClientValue/${statusName}`
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
}
export async function updateClientStatus(id, newStatus) {
    try {
        const response = await fetch(
            `${baseUrl}/api/Client/${id}/status`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: newStatus,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating client status:", error);
        throw error;
    }
}

export async function loginUser(email, password) {
    const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",   // <-- ADD THIS
        body: JSON.stringify({
            email,
            password,
        }),
    });

    return await response.json();
}

export async function getCurrentUser() {
    console.log(`${baseUrl}/auth/me`);
    const response = await fetch(
        `${baseUrl}/auth/me`,
        {
            credentials: "include",
        }
    );

    return response.json();
}