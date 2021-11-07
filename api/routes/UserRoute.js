const express = require('express');
const router = express.Router();

const UserController = require("../controllers/UserController");
const UserService = require("../services/UserService");

// User login
router.post("/login", (req, res, next) => {
    const { username } = req.body;

    console.log(username)

    UserController.login(username, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.post("/role", UserService.allowAdmin, (req, res, next) => {
    const {
        username,
        role
    } = req.body;

    UserController.updateUserWRole(username, role, (status, payload) => {
        res.status(status).json(payload);
    });
});


router.get("/role/:role", (req, res, next) => {
    const role = req.params.role;
    
    UserController.findUserWRole(role, (status, payload) => {
        res.status(status).json(payload);
    });
});


module.exports = router;