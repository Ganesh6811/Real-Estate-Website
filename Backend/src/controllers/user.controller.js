import cloudinary from "cloudinary";
import Post from "../Model/Post.model.js";
import User from "../Model/User.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const updateProfilePic = async (req, res) => {
    const { image } = req.body;
    const id = req.user.id;

    try {

        const result = await cloudinary.uploader.upload(image);
        const imageUrl = result.secure_url;

        await User.findByIdAndUpdate(id, { image: imageUrl });
        console.log("Profile Pic updated");
        res.status(200).json({ message: "Profile Pic updated successfully" });
    }
    catch (err) {
        console.log("Error in updateProfilePic controller:", err);
        res.status(400).json({ message: "Internal Server Error" });
    }
}


export const savePost = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;

    try {
        const getPostData = await Post.findOne({ _id: postId });
        if (!getPostData) {
            console.log("Given Post is not available");
            return res.status(400).json({ message: "Given Post is not available" });
        }

        await User.findByIdAndUpdate(userId, { $push: { savedPosts: postId } });
        console.log("Post Saved");
        res.status(201).json({ message: "Post saved successfully" });
    }
    catch (err) {
        console.log("Error in savePost controller:", err);
        res.status(400).json({ message: "Internal Server Error" });
    }
}


export const unSavePost = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user || !Array.isArray(user.savedPosts)) {
            return res.status(404).json({ message: "User not found or savedPosts invalid" });
        }
        const updatedPosts = user.savedPosts.filter(p => p.toString() !== postId.toString());
        user.savedPosts = updatedPosts;
        await user.save();
        console.log("Post unsaved");
        res.status(204).json({ message: "Post was unsaved successfully" });
    }
    catch (err) {
        console.log("Error in unSavePost controller:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const sendMail = async (req, res) => {
    const { firstName, lastName, email, phoneNo, message } = req.body;
    const receiverMail = process.env.COMPANY_MAIL;

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: receiverMail,
                pass: process.env.MAIL_PASSWORD,
            }
        });

        await transporter.sendMail({
            from: `"Email Scheduler" <${receiverMail}>`,
            to : receiverMail,
            subject:"User send this information",
            text:`Information from the user`,
            html: `<p>First Name:<b>${firstName}</b> </p> <br /> <p>Last Name:<b>${lastName}</b> </p> <br /> <p>Email:<b>${email}</b> </p> <br /> <p>Phone No:<b>${phoneNo}</b> </p> <br /> <p>Message:<b>${message}</b> </p> <br />`,
        });

        res.status(204).json({message:"Mail sended successfully"});
    }
    catch (err) {
        console.log("Error in the sendMail controller:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}