const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.post("/auth/sign-up", userController.signUp);
router.post("/auth/login", userController.login);
router.post("/auth/logout", userController.logout);
router.post("/getcouponcode", userController.getCoupon);
router.post("/bookshow", userController.bookShow);
module.exports = router;