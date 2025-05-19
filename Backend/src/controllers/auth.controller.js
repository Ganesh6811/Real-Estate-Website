import bcrypt from "bcrypt"
import generateToken from "../lib/utils.js";
import User from "../Model/User.model.js"; 

export const signUp = async (req, res) => {
    const { name, email, phoneNo, password } = req.body;
    try {
        if (!name || !email || !phoneNo || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const checkEmail = await User.findOne({email});
        if(checkEmail){
            return res.status(400).json({message:"Email already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = new User({
            name,
            email,
            phoneNo,
            password:hashedPassword,
        });

        await data.save();
        generateToken(data, res);

        console.log("Signed Up Successfully");
        res.status(200).json({
            _id: data._id,
            name: data.name,
            Email: data.email,
            phoneNo: data.phoneNo,
        });
    }
    catch (err) {
        console.log("Error in the login controller:", err);
        res.status(400).json({ message: "Internal Server Error" });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const getData = await User.findOne({ email });
        if (!getData) {
            return res.status(400).json({ message: "Credentials are wrong" });
        }

        const checkPassword = await bcrypt.compare(password, getData.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Credentials are wrong" });
        }

        generateToken(getData, res);
        res.status(200).json({message:"Loggd In"})
        
    }
    catch (err) {
        console.log("Error in login controller:", err);
        res.status(400).json({ message: "Internal Server Error" });
    }
}


export const logOut = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({message:"Logged out successfully"});
    }
    catch (err) {
        console.log("Error in logOut controller:", err);
        res.status(400).json({ message: "Internal Server Error" });
    }
}


export const checkAuth = (req, res)=>{
    try{
        res.status(200).json(req.user);
    }
    catch(err){
        console.log("Error in check controller:", err);
        res.status(400).json({message:"Internal Server Error"});
    }
}