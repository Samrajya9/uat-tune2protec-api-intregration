import { Router } from "express";
import { validateInsurancePlansRequest } from "../middleware/validators/insurance-plans.validator.js";
import { validateInsurancePlansConfirmRequest } from "../middleware/validators/insurance-plans-confirm.validator.js";
import {
  checkCreditBalance,
  confirmPurchase,
  getAvailablePlans,
} from "../services/insurance.service.js";

const router = Router();

router.get("/account/credit-balance", async (req, res) => {
  const currencyCode = "NPR";
  const countryCode = "NP";
  try {
    const creditResponse = await checkCreditBalance(currencyCode, countryCode);
    res.json(creditResponse);
  } catch (error) {
    console.error("Error fetching credit balance:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "An unexpected error occurred while processing your request",
    });
  }
});

router.post("/insurance/plans", async (req, res) => {
  try {
    const body = req.body;

    const validation = validateInsurancePlansRequest(body);

    if (!validation.isValid()) {
      return res.status(400).json({
        error: "Validation failed",
        details: validation.getErrorMessages(),
      });
    }

    const { data } = validation;

    const insuranceResponse = await getAvailablePlans(data);

    res.json(insuranceResponse);
  } catch (error) {
    console.error("Error fetching insurance plans:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "An unexpected error occurred while processing your request",
    });
  }
});

router.post("/insurance/plans/confirm", async (req, res) => {
  try {
    const body = req.body;
    const validation = validateInsurancePlansConfirmRequest(body);
    if (!validation.isValid()) {
      return res.status(400).json({
        error: "Validation failed",
        details: validation.getErrorMessages(),
      });
    }
    const { data } = validation;
    const confirmResponse = await confirmPurchase(data);
    res.json(confirmResponse);
  } catch (error) {
    console.error("Error confirming purchase:", error);
    res.status(500).json({
      error: error || "Internal server error",
      message: "An unexpected error occurred while processing your request",
    });
  }
});

export default router;
