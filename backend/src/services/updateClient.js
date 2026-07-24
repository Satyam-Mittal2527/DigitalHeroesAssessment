import { supabase_admin } from "../../db/supabase_client.js";

export const updateClientStatus = async ({ id, status }) => {
    console.log("Updating client:", id, status);

    try {
        const { data, error } = await supabase_admin
            .from("ClientData")
            .update({
                status: status,
            })
            .eq("id", id)
            .select();

        if (error) {
            throw error;
        }

        console.log("Client status updated successfully");

        return {
            status_code: 200,
            message: "Client status updated successfully",
            data,
        };
    } catch (error) {
        console.error(error);

        return {
            status_code: 500,
            message: `Database update error: ${error.message}`,
        };
    }
};