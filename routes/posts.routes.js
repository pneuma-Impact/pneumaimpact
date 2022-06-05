const express = require("express");

const router = express.Router();

const postsController = require("../controllers/postsController");
const postsValidator = require("../validators/postsValidator");

router.post("/", postsValidator.store, postsController.store);
router.get("/slug/:slug", postsController.singleBySlug);
router.get("/id/:id", postsController.single);
router.put("/id/:id", postsValidator.store, postsController.update);
router.delete("/id/:id", postsController.delete);

module.exports = router;
