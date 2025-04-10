const express = require("express");
const router = express.Router();
const updateProgress = require("../controllers/user/updateProgress");

router.put("/update", updateProgress);

module.exports = router;
