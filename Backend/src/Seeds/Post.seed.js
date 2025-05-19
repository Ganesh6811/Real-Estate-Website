import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../Model/Post.model.js";

dotenv.config();

const seedPosts = [
    {
        userId: "6814d99104b39924f2f71b5c",
        title: "Modern 2BHK Apartment in Gachibowli",
        description: "Spacious and well-lit apartment near IT hub, schools, and malls.",
        city: "Hyderabad",
        latitude: 17.4448,
        longitude: 78.3498,
        price: 3200000,
        type: "Buy",
        bedRooms: 2,
        bathRooms: 2,
        images: [
            "https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg",
            "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
            "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
            "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg"
        ]
    },
    {
        userId: "6814dd1b2f11e82893a1d467",
        title: "Cozy 1BHK for Rent in Koramangala",
        description: "Ideal for working professionals, close to cafes and tech parks.",
        city: "Bengaluru",
        latitude: 12.9352,
        longitude: 77.6143,
        price: 15000,
        type: "Rent",
        bedRooms: 1,
        bathRooms: 1,
        images: [
            "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
            "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg",
            "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
            "https://images.pexels.com/photos/276715/pexels-photo-276715.jpeg"
        ]
    },
    {
        userId: "6814eba5b7ab751ff9e1a90a",
        title: "Luxury Villa with Pool in Goa",
        description: "A dream villa near the beach with modern amenities and private pool.",
        city: "Goa",
        latitude: 15.2993,
        longitude: 74.1240,
        price: 14500000,
        type: "Buy",
        bedRooms: 4,
        bathRooms: 4,
        images: [
            "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
            "https://images.pexels.com/photos/2102588/pexels-photo-2102588.jpeg",
            "https://images.pexels.com/photos/2102589/pexels-photo-2102589.jpeg",
            "https://images.pexels.com/photos/2102590/pexels-photo-2102590.jpeg"
        ]
    },
    {
        userId: "68159f3abbf0daf3e36ff407",
        title: "3BHK Family Home in Pune",
        description: "Perfect for families, located in a peaceful residential colony.",
        city: "Pune",
        latitude: 18.5204,
        longitude: 73.8567,
        price: 7500000,
        type: "Buy",
        bedRooms: 3,
        bathRooms: 3,
        images: [
            "https://images.pexels.com/photos/259984/pexels-photo-259984.jpeg",
            "https://images.pexels.com/photos/259987/pexels-photo-259987.jpeg",
            "https://images.pexels.com/photos/259989/pexels-photo-259989.jpeg",
            "https://images.pexels.com/photos/259990/pexels-photo-259990.jpeg"
        ]
    },
    {
        userId: "68164049453c6231bec4ac0d",
        title: "1RK Studio Flat in Mumbai Suburbs",
        description: "Budget-friendly studio in Andheri East with all basic facilities.",
        city: "Mumbai",
        latitude: 19.1180,
        longitude: 72.8694,
        price: 10000,
        type: "Rent",
        bedRooms: 1,
        bathRooms: 1,
        images: [
            "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
            "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg",
            "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
            "https://images.pexels.com/photos/276715/pexels-photo-276715.jpeg"
        ]
    },
    {
        userId: "68164049453c6231bec4ac0e",
        title: "Spacious 4BHK Duplex in Chennai",
        description: "Elegant duplex with modern interiors and ample parking space.",
        city: "Chennai",
        latitude: 13.0827,
        longitude: 80.2707,
        price: 9500000,
        type: "Buy",
        bedRooms: 4,
        bathRooms: 3,
        images: [
            "https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg",
            "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
            "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
            "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg"
        ]
    },
    {
        userId: "68164049453c6231bec4ac0f",
        title: "Beachside Cottage in Kerala",
        description: "Charming cottage with sea view, perfect for a peaceful retreat.",
        city: "Kochi",
        latitude: 9.9312,
        longitude: 76.2673,
        price: 5500000,
        type: "Buy",
        bedRooms: 2,
        bathRooms: 2,
        images: [
            "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
            "https://images.pexels.com/photos/2102588/pexels-photo-2102588.jpeg",
            "https://images.pexels.com/photos/2102589/pexels-photo-2102589.jpeg",
            "https://images.pexels.com/photos/2102590/pexels-photo-2102590.jpeg"
        ]
    }
];


const seedDatabase = async () => {
    try {

        const MONGO_URI = process.env.MONGODB_CONNECTION_URL;

        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined in .env");
        }

        await mongoose.connect("MONGO_URI", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected...");
        await Post.insertMany(seedPosts);
        console.log("Database seeded successfully");
    }
    catch (err) {
        console.log("Error while seeding the database:", err);
    }
}

seedDatabase();