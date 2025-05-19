import jwt from "jsonwebtoken";
import User from "../Model/User.model.js";

const ProtectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) { 
            
            return res.status(400).json({ message: "Unauthorized access : Token Not Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECREATE_KEY);
        const getData = await User.findOne({ _id: decoded.id });

        if (!getData) {
            return res.status(400).json({ message: "Unauthorized access : Data not found" });
        }

        req.user = getData;

        next();
    }
    catch (err) {
        console.log("Error in protectedRoute:", err);
        res.status(400).json({ message: "Internal Server Error" });
    }
}


export default ProtectedRoute;