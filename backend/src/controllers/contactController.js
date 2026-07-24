// Handle form submission from frontend
import { saveClientDetails } from "../services/saveClient.js";
import { getClientsByStatus } from "../services/fetchClient.js";

export const submitContactForm = (req, res) => {
  try {
    const { name, email, budget, message } = req.body;
    console.log(name)
    // Validation
    if (!name || !email || !budget || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const clientDetails = {
        name : name,
        email : email,
        budget : budget,
        message : message
    }

    const response = saveClientDetails(clientDetails)
    // Log the form data
    console.log("Form submission received:", {
      name,
      email,
      budget,
      message,
      timestamp: new Date().toISOString(),
    });

    // Here you can save to database, send email, etc.
    // For now, just return success
    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: {
        name,
        email,
        budget,
        message,
      },
    });
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to submit form",
    });
  }
};




export const getFormValue = async (req, res) => {
    try {
        const { status } = req.params;

        const result = await getClientsByStatus(status);

        return res.status(result.status_code).json({
            success: result.status_code === 200,
            message: result.message,
            data: result.data,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

