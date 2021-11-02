import express from "express";
import AccountController from "../controllers/account.controller.js";

const router = express.Router();

router.post("/", AccountController.createAccount);

router.get("/", AccountController.getAccounts);

router.get("/:id", AccountController.getAcountById);

router.delete("/:id", AccountController.deleteAccountById);

// use put for full update of a resource
router.put("/", AccountController.updateAccount);

// use patch for partial update of resource
router.patch("/updateBalance", AccountController.updateBalance);

// will run for all endpoints above it
router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
