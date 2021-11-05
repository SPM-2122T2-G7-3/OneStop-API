const User = require('../models/UserModel');

class UserService {
    // Do not test the middleware
    static async allowUser(req, res, next) {
        const username = req.header['username'];
        const { success, result } = await this.getUser(username);

        if (!success) {
            res.status(500).json({ "error": result })
        } else if (!result) {
            res.sendStatus(401)
        } 
        
        next();
    }

    
    // Do not test the middleware
    static async allowAdmin(req, res, next) {
        const username = req.header['username'];
        const { success, result } = await this.getUser(username);

        if (!success) {
            res.status(500).json({ "error": result })
        } else if (!result || result.role !== "admin") {
            res.sendStatus(401)
        }
        
        next();
    }


    // Do not test the middleware
    static async allowTrainer(req, res, next) {
        const username = req.header['username'];
        const { success, result } = await this.getUser(username);
        
        if (!success) {
            res.status(500).json({ "error": result })
        } else if (!result || result.role !== "trainer") {
            res.sendStatus(401)
        } 
        
        next();
    }


    // Do not test the middleware
    static async allowUser(req, res, next) {
        const username = req.header['username'];
        const { success, result } = await this.getUser(username);

        if (!success) {
            res.status(500).json({ "error": result })
        } else if (!result || result.role !== "learner") {
            res.sendStatus(401)
        } 
        
        next();
    }

    
    static async getUser(username) {
        let success = true;

        try {
            const result = await User.findOne()
                .where("username", username)
                .exec()

            return {
                success,
                result
            }
        } catch (error) {
            console.error(error);
            const result = {
                "error": error.message
            }

            success = false;

            return {
                success,
                result
            };
        }
    }
}

module.exports = UserService;