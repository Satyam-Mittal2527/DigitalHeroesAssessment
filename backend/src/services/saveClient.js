import { supabase_admin } from "../../db/supabase_client.js";

export const saveClientDetails = async (userDetails) => {
    console.log("Reached services:", userDetails.name);

    const userName = userDetails.name.trim().split(" ");

    const firstName = userName[0];
    const lastName = userName.slice(1).join(" "); // Handles multiple last names

    try {
        const { data, error } = await supabase_admin
            .from("ClientData")
            .insert([
                {
                    FirstName: firstName,
                    LastName: lastName,
                    email: userDetails.email,
                    budget: userDetails.budget,
                    message: userDetails.message,
                },
            ])
            .select();

        if (error) {
            throw error;
        }

        console.log("User saved successfully");

        return {
            status_code: 201,
            message: "User request saved successfully",
            data,
        };
    } catch (error) {
        console.error(error);

        return {
            status_code: 500,
            message: `Database insertion error: ${error.message}`,
        };
    }
};