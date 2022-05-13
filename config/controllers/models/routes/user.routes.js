const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post("/auth/signup", userController.signUp);
router.post("/auth/login", userController.login);
router.post("/auth/logout", userController.logout);
router.post("/auth/coupon", userController.getCoupon);
router.post("/auth/bookshow", userController.bookShow);
module.exports = router;