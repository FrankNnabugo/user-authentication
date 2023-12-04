const express = require("express");
const router = express.Router();
const {userRegister} = require("../controllers/register");
const {userLogin} = require("../controllers/login");
const {logOut} = require("../controllers/logout");
const {resetPassword} =require("../controllers/resetPassword");
const {generateToken} = require("../controllers/generateToken");


router.post("/register", userRegister );

router.post("/login", userLogin );

router.post("/logOut", logOut );

router.post("/generateToken", generateToken);

router.post("/resetPassword", resetPassword);



module.exports ={router};