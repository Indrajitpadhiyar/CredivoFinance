const { signup } = require("../controllers/AuthController");
const { SignupValidation } = require("../middlewares/AuthValidation");

const router = require("express").Router();

router.post("/login", (req, res) => {
  res.send("login successful");
});

router.post("/signup", SignupValidation, signup);

module.exports = router;
