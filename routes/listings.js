const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validListing } = require("../middleware.js");
const multer = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage})


const listingControllers = require("../controllers/listings.js");



//router.route for /
router.route("/")
    .get(wrapAsync(listingControllers.index)) //index route
    .post(isLoggedIn, upload.single("listing[image]"), validListing, wrapAsync(listingControllers.createListing));   //create new route
    // .post(upload.single("listing[image]"), (req, res) => {
    //     res.send(req.file);
    // })


//new route (create)
router.get("/new", isLoggedIn, listingControllers.newListingForm);



//router.route for /:id
router.route("/:id")
    .get(wrapAsync(listingControllers.showListing))  //show route (read)
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validListing, wrapAsync(listingControllers.updateListing))  //update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.destroyListing));    //delete route



//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.editListing));



module.exports = router;