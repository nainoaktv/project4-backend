const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        // grab the authorization header from frontend
        let token = req.header("Authorization");

        // If no token is found, SEND ACCESS DENIED
        if (!token) {
            return res.status(403).send("Access Denied (no token) ");
        }

        // token is set from the frontend, take everything from the right side of bearer
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        // proceed to next step of function
        next();

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    verifyToken
}