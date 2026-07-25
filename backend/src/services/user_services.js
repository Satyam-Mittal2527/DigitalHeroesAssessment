import { supabase } from "../../db/supabase_client.js";

export const loginUserService = async ({ email, password }) => {
    try {
        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });
        console.log("Error:", error);
        console.log("User:", data.user);
        console.log("Session:", data.session);
        if (error) {
            throw error;
        }

        return {
            status_code: 200,
            message: "Login successful",
            data,
        };
    } catch (error) {
        return {
            status_code: 401,
            message: error.message,
        };
    }
};



export const getCurrentUser = async (req) => {

    console.log("Cookies:", req.cookies);

    const token = req.cookies.access_token;
    console.log("Token:", token);

    if (!token) {
        return {
            status_code: 401,
            success: false,
            message: "Not authenticated",
        };
    }

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
        return {
            status_code: 401,
            success: false,
            message: "Invalid token",
        };
    }
    console.log("User current complete")
    return {
        status_code: 200,
        success: true,
        user,
    };
};