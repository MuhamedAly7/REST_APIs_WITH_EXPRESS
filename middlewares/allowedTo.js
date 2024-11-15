const appError = require("../utils/appError");

module.exports = (...roles) => {
    return (req, res, next) => {
        // Here we want to make sure current logged in user has the role that exists on roles (allowed roles)
        // the property currentUser.role is added to req when verify the token in verifyToken middleware
        if(!roles.includes(req.currentUser.role)) {
            return next(appError.create("this role not authorized", 401));
        }
        next();
    }
}