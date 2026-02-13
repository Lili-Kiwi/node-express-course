const express = require("express");
const router = express.Router();

const { logon } = require("../controllers/auth");
const { hello } = require("../controllers/hello");
const auth = require("../middleware/auth");

router.post("/api/v1/logon", logon);
router.get("/api/v1/hello", auth, hello);

module.exports = router;
