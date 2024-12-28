const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");



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


const initdb = async() => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj, owner: "66d55b7a87c825b84d61fcc6"}))
    await Listing.insertMany(initdata.data);
    console.log("Data was initilize...");
};

initdb();