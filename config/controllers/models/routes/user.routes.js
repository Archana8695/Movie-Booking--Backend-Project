const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post("/sign-up", userController.signUp);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;