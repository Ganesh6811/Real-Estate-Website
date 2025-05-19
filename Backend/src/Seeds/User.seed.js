import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../Model/User.model.js";

dotenv.config();

const seedUsers = [
    {
        name: "Emma Thompson",
        email: "emma.thompson@example.com",
        password: "123456",
        phoneNo: "9876543210",
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        name: "Olivia Miller",
        email: "olivia.miller@example.com",
        password: "123456",
        phoneNo: "9123456789",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        name: "Sophia Davis",
        email: "sophia.davis@example.com",
        password: "123456",
        phoneNo: "9345678123",
        profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        name: "Ava Wilson",
        email: "ava.wilson@example.com",
        password: "123456",
        phoneNo: "9456789012",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        name: "James Anderson",
        email: "james.anderson@example.com",
        password: "123456",
        phoneNo: "9988776655",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        name: "Lucas Moore",
        email: "lucas.moore@example.com",
        password: "123456",
        phoneNo: "9871200345",
        profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
        name: "Amelia Garcia",
        email: "amelia.garcia@example.com",
        password: "123456",
        phoneNo: "9812345670",
        profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
        name: "Daniel Rodriguez",
        email: "daniel.rodriguez@example.com",
        password: "123456",
        phoneNo: "7894561230",
        profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    }
    // Add more users as needed...
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected...");
        await User.insertMany(seedUsers);
        console.log("Database Seeded successfully");
    }
    catch (err) {
        console.log("Error while seeding the userData:", err);
    }
}

seedDatabase();