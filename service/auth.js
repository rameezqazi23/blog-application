const jwt = require("jsonwebtoken");

const secretKey = "hwuidnmcdvadasm";

const createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    }

    const token = jwt.sign(payload, secretKey)

    return token

}


const validateToken = (token) => {
    if (!token) return null

    try {
        return jwt.verify(token, secretKey)

    } catch (error) {
        return console.log(error.message)

    }
}



module.exports = {
    createTokenForUser,
    validateToken,
}