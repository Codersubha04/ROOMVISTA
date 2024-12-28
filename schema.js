const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required().min(10),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),

        'image.url': joi.string()
            .uri()
            .empty('') // Empty string ko undefined karein
            .default('https://example.com/default-image.jpg'), // Default value set karein

        // image: joi.string().required().allow("", null)

        // image: joi.object({
        //     filename: joi.string().default('listingimage'),
        //     url: joi.string()
        //         .uri() // Validates if the string is a URI
        //         .allow('') // Allows an empty string
        //         .default('https://a0.muscache.com/im/pictures/miso/Hosting-694055224756906854/original/76f85a0c-b3e2-4f1d-9aa9-d7838f2393c6.jpeg?im_w=1200&im_q=highq')
        //         .custom((value, helpers) => {
        //             // Set default URL if value is an empty string
        //             return value === '' ? 'https://a0.muscache.com/im/pictures/miso/Hosting-694055224756906854/original/76f85a0c-b3e2-4f1d-9aa9-d7838f2393c6.jpeg?im_w=1200&im_q=highq' : value;
        //         })
        //     })
       
    }).required()
});



module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required()
    }).required()
});