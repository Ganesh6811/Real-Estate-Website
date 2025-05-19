import jwt from "jsonwebtoken";

const generateToken = (data, res) => {
    const token = jwt.sign({
        id: data._id,
        name: data.name,
        email: data.email,
        phoneNo: data.phoneNo,
    },
        process.env.JWT_SECREATE_KEY,
        { expiresIn: "7D" }
    );

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,       
        sameSite: "None",
    });
}

export default generateToken;