const {validateToken} = require("../service/auth")

const checkAuthenticationCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]
        if (!tokenCookieValue) {
           return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;

        } catch (error) {
            console.log(error.message)

        }
       return next();

    }

}

module.exports = {
    checkAuthenticationCookie
}