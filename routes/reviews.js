const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validReview, isLoggedIn, isReviewAuther } = require("../middleware.js");



const reviewController = require("../controllers/reviews.js");


//Review
//Review POST Route

router.post("/", isLoggedIn, validReview, wrapAsync(reviewController.createReview));

//Review DELETE Route
router.delete("/:reviewId", isLoggedIn, isReviewAuther, wrapAsync(reviewController.destroyReview));




module.exports = router;