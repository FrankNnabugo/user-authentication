const express = require("express");
const router = express.Router();
const {signUp} = require("../controllers/signup");
const {Login} = require("../controllers/login");
const {logOut} = require("../controllers/logout");
const {resetPassword} =require("../controllers/resetPassword");
const {forgotPassword} = require("../controllers/forgotPassword");
const {refreshToken} = require("../controllers/refreshToken");
const {authenticate} = require("../middleware/authenticate");


router.post("/signup", signUp);
router.post("/login", Login);
router.post("/logOut", logOut );
router.post("/forgotPassword", authenticate, forgotPassword);
router.post("/resetPassword", authenticate, resetPassword);
router.post("/refreshToken", authenticate, refreshToken);



module.exports ={router};