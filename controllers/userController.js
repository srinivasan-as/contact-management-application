const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 

/**
 * @route GET api/users/info
 * @description Get Information of a user
 * @access private
 */
const currentUser = asyncHandler(async (req,res) => {
    res.status(200).json(req.user);
});

/**
 * @route POST api/users/register
 * @description Register a user
 * @access public
 */
const registerUser = asyncHandler(async  (req,res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error(`All fields are madatory`);
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable) {
        res.status(400);
        throw new Error(`User already registered`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    if(user) 
        res.status(200).json({ _id: user.id, email: user.email });
    else {
        res.status(400);
        throw new Error(`User data is not not valid`);
    }
});

/**
 * @route POST api/users/login
 * @description Login user
 * @access public
 */
const loginUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error(`All field are mad=ndatory`);
    }
    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" });
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error(`Email or Password is incorrect`);
    }
});

module.exports = { registerUser, loginUser, currentUser }