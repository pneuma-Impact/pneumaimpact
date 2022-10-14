const express = require("express");
const auditValidator = require("../validators/auditValidators");
const auditController = require("../controllers/auditsController");
const { userIsAdmin, userIsVerified } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", userIsVerified, auditValidator.store, auditController.store);
router.get("/", userIsAdmin, auditController.index);
router.get("/mine", userIsVerified, auditController.getMyAudit);

module.exports = router;
