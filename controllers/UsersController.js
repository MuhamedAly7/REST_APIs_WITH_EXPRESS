const User = require('../models/user_model');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');


const getAllUsers = asyncWrapper(async (req, res) => {
    
    
    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const users = await User.find({}, {"__v": false, "password": false}).limit(limit).skip(skip);
    res.json({status: httpStatusText.SUCCESS, data: {users}});
}
);

const register = asyncWrapper( async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body;

    const olduser = await User.findOne({email: email});

    if(olduser) {
        const error = appError.create('user already exists', 400, httpStatusText.FAIL);
        return next(error);
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    // Generate jwt token
    const token = await generateToken({email: newUser.email, id: newUser._id});
    newUser.token = token;
    await newUser.save();
    res.status(201).json({status: httpStatusText.SUCCESS, data: {user: newUser}});
}
);

const login = asyncWrapper(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email && !password) {
        const error = appError.create('email and password are required', 400, httpStatusText.FAIL)
        return next(error);
    }

    const user = await User.findOne({email: email});
    
    if(!user) {
        const error = appError.create('user not found', 404, httpStatusText.FAIL);
        return next(error);
    }
    
    const matchedPassword = await bcrypt.compare(password, user.password);

    if(user && matchedPassword) {
        // logged in successfully
        const token = await generateToken({email: user.email, id: user._id});
        res.json({status: httpStatusText.SUCCESS, data: {token}});
    } else {
        const error = appError.create('something wrong!', 500, httpStatusText.ERROR);
        return next(error);
    }

}
);

module.exports = {
    getAllUsers,
    register,
    login
}