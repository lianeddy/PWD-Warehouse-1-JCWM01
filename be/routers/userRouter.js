const express = require("express");
const { userController } = require("../controllers");
const { authToken } = require("../helper/authToken");
const { authTokenF } = require("../helper/forgotPassword/authTokenF");

const router = express.Router();

//ROUTER METHOD
router.post("/register", userController.Register);
router.patch("/verification", authToken, userController.verification);
router.post("/login", userController.Login);
router.patch("/edit", authToken, userController.editDataUser);
router.patch("/change-password", authToken, userController.changePasswordUser);

router.post("/", authToken, userController.getDataUser);
// router.patch("/", authToken, userController.getDataUser);
router.patch("/tes", authToken, userController.editDataUser);

router.post("/forgot-password", userController.ForgotPassword);
router.patch("/reset-password", authTokenF, userController.verificationF);

module.exports = router;
