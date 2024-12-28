const Listing = require("../models/listing.js")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//index route
module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
    // console.log("Data is showing");
}

//new lsiting form 
module.exports.newListingForm = (req, res) => {
    res.render("listings/new.ejs");
}

//create listing
module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
        .send()

    let filename = req.file.filename;
    let url = req.file.path;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { filename, url }
    newListing.geometry = response.body.features[0].geometry;

    let saveListing = await newListing.save();
    console.log(saveListing);
    req.flash("success", "New Listing is created !");
    res.redirect("/listings")
}

//show listing
module.exports.showListing = async (req, res) => {

    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");

    console.log(listing.owner);
    if (!listing) {
        req.flash("error", "Listing is not found !");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });

}


//edit listing
module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing is not found !");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing })
}

//update listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let filename = req.file.filename;
        let url = req.file.path;
        listing.image = { filename, url };
        await listing.save();
    }

    req.flash("success", "Listing is Updated !");
    res.redirect(`/listings/${id}`);
}


//destroy listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing is Deleted !");
    res.redirect("/listings");
    console.log(deleteListing);
}