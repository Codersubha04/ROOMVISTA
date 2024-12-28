const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


const userController = require("../controllers/users.js");
const { route } = require("./listings.js");


//sign up part

// router.route for signup 
router.route("/signup")
    .get(userController.renderSignUpForm)  //signup form
    .post(wrapAsync(userController.signUpUser));  //signup


//login part


// router.route for login 
router.route("/login")
    .get(userController.renderLoginForm)  // login form 
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.loginUser);   //login user


//logout user
router.get("/logout", userController.logoutUser)







module.exports = router;