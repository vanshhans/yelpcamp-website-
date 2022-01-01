const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: "61b72945e2a6f19961e32313",
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, porro quod modi placeat quasi tempora explicabo eaque rem sed dicta soluta dolore pariatur. Suscipit laborum aperiam magnam. Repellendus, at libero?",
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/vanshcloud/image/upload/v1639903491/YelpCamp/vq3a1kn4ymtrvhsgyy7b.png',
                    filename: 'YelpCamp/vq3a1kn4ymtrvhsgyy7b',
                },
                {
                    url: 'https://res.cloudinary.com/vanshcloud/image/upload/v1639903492/YelpCamp/fjqn3lknwjaf3m4z6f4p.png',
                    filename: 'YelpCamp/fjqn3lknwjaf3m4z6f4p',
                },
                {
                    url: 'https://res.cloudinary.com/vanshcloud/image/upload/v1639903493/YelpCamp/xxvnkdat37182nbcubyy.png',
                    filename: 'YelpCamp/xxvnkdat37182nbcubyy',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})