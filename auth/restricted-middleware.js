const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                //invalid token
                res.status(401).json({message : 'Invalid Token!!!'})
            } else {
                //valid token
                req.user = { department : decodedToken.department, username : decodedToken.username };
                next();
            }
        })
    } else {
        res.status(400).json({ message: "You do not have a token" })
    }
}