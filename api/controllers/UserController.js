const UserService = require('../services/UserService');

class UserController {
    static async login(username, callback = (status, payload) => {}) {
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

    static async findUserWRole(role, callback = (status, payload) => {}) {
        const validationErrors = [];
        role ? null : validationErrors.push("role cannot be empty");

        if (validationErrors.length == 0) {
            await User.find()
                .where("role", role)
                .exec()
                .then(result => {
                    callback(200, {
                        "users": result
                    });
                })
                .catch(error => {
                    callback(500, {
                        "error": error.message
                    })
                });
        } else {
            callback(400, {
                "errors": validationErrors
            });
        }
    }
    
    
    static async updateUserWRole(username, role, callback = (status, payload) => {}) {
        const validationErrors = [];
        username ? null : validationErrors.push("username cannot be empty");
        role ? null : validationErrors.push("role cannot be empty");
        
        if (validationErrors.length == 0) {
            await User.findOneAndUpdate({
                username: username
            }, {
                role: role
            })
            .exec()
            .then(result => {
                callback(200, {
                    "message": "User role updated"
                });
            })
            .catch(error => {
                callback(500, {
                    "error": error.message
                })
            });
        } else {
            callback(400, {
                "errors": validationErrors
            });
        }
    }
}


module.exports = UserController;