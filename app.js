const express = require("express")
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const methodOverrirde = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")

if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}


const listingsRoute = require("./routes/listings.js");
const reviewsRoute = require("./routes/reviews.js");
const userRoute = require("./routes/user.js");



//set & use value
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverrirde("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "Assets")));


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


main()
    .then((res) => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err)
    })


//connect mongoose
async function main() {
    await mongoose.connect(MONGO_URL);
}


//express-session and cookie setup
const sessionValue = {
    secret: "mySecratStrings",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    },
};


// home route
// app.get("/", (req, res) => {
//     res.send("Project is coming");
// });



//use express-session and cookie setup
app.use(session(sessionValue));
app.use(flash());
//passport for authenticate
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//flash message pass middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})


//listings
app.use("/listings", listingsRoute);

//Review
app.use("/listings/:id/reviews", reviewsRoute);

//signup - login
app.use("/", userRoute);





app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})



//error handle middleware
app.use((err, req, res, next) => {

    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });

    // res.status(statusCode).send(message);
    // res.send("Somthing went wrong");
})



//connection
app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`)
})















