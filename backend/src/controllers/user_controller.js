import { loginUserService, getCurrentUser } from "../services/user_services.js";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await loginUserService({ email, password });

        if (result.status_code !== 200) {
            return res.status(result.status_code).json({
                success: false,
                message: result.message,
            });
        }

        const { session, user } = result.data;

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("access_token", session.access_token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
            maxAge: 1000 * 60 * 60, // 1 hour
        });

        res.cookie("refresh_token", session.refresh_token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        });

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getCurrentUserController = async (req, res) => {
    try {
        const response = await getCurrentUser(req);

        return res.status(response.status_code).json(response);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};