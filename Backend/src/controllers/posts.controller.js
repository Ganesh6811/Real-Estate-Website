import cloudinary from "cloudinary";
import Post from "../Model/Post.model.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

export const createPost = async (req, res) => {
    const { userId, title, description, city, latitude, longitude, price, type, bedRooms, bathRooms, images } = req.body;

    try {
        if (!title || !description || !city || !latitude || !longitude || !price || !type || !bedRooms || !bathRooms || !images) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const imageUploadPromises = images.map(image => cloudinary.uploader.upload(image));
        const uploadedImages = await Promise.all(imageUploadPromises);
        const imageUrls = uploadedImages.map(img => img.secure_url);

        const newPost = new Post({
            userId,
            title,
            description,
            city,
            latitude,
            longitude,
            price,
            type,
            bedRooms,
            bathRooms,
            images: imageUrls,
        });

        newPost.save();
    }
    catch (err) {
        console.log("Error in CreatePost controller:", err);
        res.status(400).json({ message: "Internal Server Error" });
    }
}


export const deletePost = async (req, res) => {
    const { postId } = req.body;

    try {
        await Post.deleteOne({ _id: postId });
        console.log("Post Deleted Successfully");
    }
    catch (err) {
        console.log("Error in deletePost controller");
        res.status(400).json("Internal Server Error");
    }
}


// export const getAllPosts


export const getPosts = async (req, res) => {
    const id = req.user._id;
    const { city, price, type, bedRooms, bathRooms } = req.query;
    try {
        const queryObj = {};
        if (city) queryObj.city = new RegExp(`^${city}$`, 'i');
        if (price) queryObj.price = price;
        if (type) queryObj.type = type;
        if (bedRooms) queryObj.bedRooms = bedRooms;
        if (bathRooms) queryObj.bathRooms = bathRooms;

        const getData = await Post.find(queryObj);
        const sendPosts = getData.map((post)=>{
            return post.userId.toString() != id.toString() ? post : null;
        })

        res.status(200).json({ sendPosts }); 
    }
    catch (err) {
        console.log("Error in getPosts controller:", err);
        res.status(400).json({ message: "Internal Server Error" });
    }
}



// Get the single post
export const getPost = async (req, res) => {
    const postId = req.params.id;

    try {
        const getData = await Post.findOne({ _id: postId }); 
        res.status(200).json({ post: getData });
    }
    catch (err) {
        console.log("Error in getPost controller:", err);
        res.status(400).json({ message: "Internal Server Error" });
    }
}

