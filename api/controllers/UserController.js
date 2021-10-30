const UserService = require('../services/UserService');

class UserController {
    static async login(username, callback = (status, payload) => {}){
        const validationErrors = [];
        username ? null : validationErrors.push("username cannot be empty");
        
        if (validationErrors.length == 0) {
            const {
                success,
                result
            } = await UserService.getUser(username);
            
            let status = success ? 200 : 500;
            
            if (!result) {
                status = 404;
                callback(status, {
                    "error": "User not found"
                })
            }
            
            callback(status, {
                "username": result.username,
                "role": result.role
            });
            
        } else {
            callback(400, {
                "errors": validationErrors
            });
        }
    }
}


module.exports = UserController;