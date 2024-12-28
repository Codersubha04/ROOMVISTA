const User = require("../models/user")


//signup form 
module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
}

//signup user
module.exports.signUpUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        let registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Signup Successfully");
            res.redirect("/listings");
        })
    }
    catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup")
    }
}


//render login form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

//login user
module.exports.loginUser = async (req, res) => {
    req.flash("success", "Welcome to the Airbnb");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}


//logout user
module.exports.logoutUser = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out");
        res.redirect("/listings");
    })
}