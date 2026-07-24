import { Router } from "express";
import {
  submitContactForm,
  getFormValue,
} from "../controllers/contactController.js";

const router = Router();

// POST endpoint to handle form submissions
router.post("/submit", submitContactForm);

// GET endpoint to retrieve form values
router.get("/ClientValue/:status", getFormValue);

export default router;