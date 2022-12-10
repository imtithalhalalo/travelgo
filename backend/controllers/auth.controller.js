const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//internal
const User = require("../models/user.model");

const signup = async (req, res) => {
    const {first_name, last_name, email, password, confirm_pass , type} = req.body;
    if(password !== confirm_pass) return res.status(400).json({message: "Passwords do not match"});
    try{
        const user = new User();
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.password = await bcrypt.hash(password, 8);
        user.confirm_pass = await bcrypt.hash(confirm_pass, 8);
        user.type = type;

        await user.save();
        res.json(user)
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
};


// export all the functions
module.exports = {
    signup,
};