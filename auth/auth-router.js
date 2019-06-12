const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js')

router.post('/register', validateUserData, (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8) 
    user.password = hash;

    Users.add(user) 
        .then( user => {
            res.status(201).json(user)
        })
        .catch( error => {
            res.status(500).json(error.message)
        })
})

router.post('/login', validateLoginCreds, (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then( user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({message:`Welcome! ${user.username}`, token})
        } else {
            res.status(401).json({message:'You shall not pass'})
        }
    })
    .catch( error => {
        res.status(500).json(error.message)
    })
})

function generateToken(user) {
    const payload = {
        subject : user.id,
        username : user.username,
        department: user.department
    }
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options);
}

//middleware 

//validate both username and password are present for login
function validateLoginCreds(req, res, next) {
    if(req.body && req.body.username && req.body.password) {
        next();
    } else {
        res.status(400).json({ message: 'Please provide both a username and password for login'})
    }
}

//validate all required user data are present for registration
function validateUserData(req, res, next) {
    if(req.body  && req.body.username && req.body.password && req.body.department ) {
            next();
    } else {
        res.status(400).json({message: 'Please provide a username, password, and a department for registration'})
    }
}


module.exports = router;