const Listing = require("../models/listing");
const Review = require("../models/review");


//create review
module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);


    await newReview.save();
    await listing.save();

    // console.log("Review added to DB");
    // res.send("Review added to DB");
    req.flash("success", "Review is Created !");
    res.redirect(`/listings/${listing._id}`);
}


// destroy review 
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review is Deleted !");

    res.redirect(`/listings/${id}`);
}

