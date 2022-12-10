const express = require("express");
const { userInfo, signin, signup } = require("../controllers/auth.controller");
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

router.get("/user", authMiddleware, userInfo);
router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;