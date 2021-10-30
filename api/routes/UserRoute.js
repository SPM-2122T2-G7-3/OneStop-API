const express = require('express');
const router = express.Router();

const UserController = require("../controllers/UserController")


// User login
router.post("/login", (req, res, next) => {
    const { username } = req.body;
    
    console.log(username)

    UserController.login(username, (status, payload) => {
        res.status(status).json(payload);
    });
});


module.exports = router;