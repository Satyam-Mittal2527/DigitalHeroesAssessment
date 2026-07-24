import { supabase_admin } from "../../db/supabase_client.js";

export const getClientsByStatus = async (status) => {
    console.log("Fetching clients with status:", status);

    try {
        const { data, error } = await supabase_admin
            .from("ClientData")
            .select("*")
            .eq("status", status.toUpperCase())
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }
       
        return {
            status_code: 200,
            message: "Clients fetched successfully",
            data,
        };
    } catch (error) {
        console.error(error);

        return {
            status_code: 500,
            message: `Error fetching clients: ${error.message}`,
            data: [],
        };
    }
};