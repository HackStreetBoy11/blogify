const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            // No token, just continue
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload; // attach user info
        } catch (error) {
            // invalid token, ignore or log
            req.user = null;
        }

        next(); // call next only once
    };
}

module.exports = {
    checkForAuthenticationCookie,
}