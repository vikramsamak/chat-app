import jwt from "jsonwebtoken";

const generatejwtToken = (userid, res) => {
    const token = jwt.sign({ userid }, process.env.SECRET_KEY, {
        expiresIn: '15d'
    })

    res.cookie("jwtToken", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, //prevent xss attacks
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generatejwtToken;