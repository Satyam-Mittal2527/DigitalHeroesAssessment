import { Router } from "express";
import {
  submitContactForm,
  getFormValue,
  updateClientStatus
} from "../controllers/contactController.js";

const router = Router();

// POST endpoint to handle form submissions
router.post("/submit", submitContactForm);

// GET endpoint to retrieve form values
router.get("/ClientValue/:status", getFormValue);

router.patch("/Client/:id/status", updateClientStatus)

export default router;